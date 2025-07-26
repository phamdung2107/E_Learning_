<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;
use App\Services\VNPayService;
use App\Http\Resources\PaymentResource;
use App\Http\Requests\CreateWithdrawRequest;
use App\Helper\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/wallet/create-topup",
     *     summary="Tạo URL thanh toán VNPay",
     *     tags={"Payment"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"amount"},
     *             @OA\Property(property="amount", type="number", example=100000)
     *         )
     *     ),
     *     @OA\Response(response=200, description="URL thanh toán được tạo thành công")
     * )
     */
    public function createVNPayTopup(Request $request, VNPayService $vnpay)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10000'
        ]);

        $user = $request->user();

        if (!$user) {
            return Response::data(['message' => 'Unauthenticated'], 401);
        }

        $topup = Payment::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'status' => 'pending'
        ]);

        $paymentUrl = $vnpay->createPaymentUrl(
            $topup->id,
            $topup->amount,
            'Nap tien vao vi #' . $topup->id
        );

        return Response::data(['payment_url' => $paymentUrl]);
    }

    /**
     * @OA\Get(
     *     path="/api/wallet/return",
     *     summary="Xử lý kết quả thanh toán VNPay",
     *     tags={"Payment"},
     *     @OA\Response(response=200, description="Xử lý nạp tiền thành công hoặc thất bại")
     * )
     */
    public function handleVNPayReturn(Request $request)
    {
        $vnp_HashSecret = env('VNP_HASH_SECRET');

        $inputData = [];
        foreach ($request->all() as $key => $value) {
            if (strpos($key, 'vnp_') === 0 && $key !== 'vnp_SecureHash' && $key !== 'vnp_SecureHashType') {
                $inputData[$key] = $value;
            }
        }

        ksort($inputData);

        $hashData = '';
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData .= '&' . urlencode($key) . '=' . urlencode($value);
            } else {
                $hashData .= urlencode($key) . '=' . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        if ($secureHash !== $request->input('vnp_SecureHash')) {
            return Response::data(['message' => 'Sai checksum'], 400);
        }

        $topup = Payment::find($request->vnp_TxnRef);
        if (!$topup || $topup->status !== 'pending') {
            return Response::data(['message' => 'Top-up không hợp lệ'], 400);
        }
        if ($request->vnp_ResponseCode === '00') {
            DB::beginTransaction();
            try {
                $bonus = 0;

                $activeEvent = Event::where('status', true)
                    ->where('start_time', '<=', now())
                    ->where('end_time', '>=', now())
                    ->first();

                if ($activeEvent) {
                    $bonus = round($topup->amount * ($activeEvent->bonus_percent / 100), 2);
                }

                $topup->status = 'completed';
                $topup->transaction_id = $request->vnp_TransactionNo;
                $topup->save();

                $user = User::find($topup->user_id);
                $user->money += $topup->amount + $bonus;
                $user->save();

                DB::commit();

                return Response::data([
                    'message' => 'Nạp tiền thành công',
                    'amount' => $topup->amount,
                    'bonus' => $bonus,
                    'total_added' => $topup->amount + $bonus
                ]);
            } catch (\Exception $e) {
                DB::rollBack();
                return Response::data(['message' => 'Có lỗi xảy ra'], 500);
            }

        } else {
            $topup->status = 'failed';
            $topup->save();
            return Response::data(['message' => 'Nạp tiền thất bại'], 400);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/wallet/my",
     *     summary="Lịch sử giao dịch của người dùng",
     *     tags={"Payment"},
     *     @OA\Response(response=200, description="Danh sách giao dịch")
     * )
     */
    public function myTransactions(Request $request)
    {
        $user = $request->user();
        $transactions = Payment::where('user_id', $user->id)->orderByDesc('created_at')->get();
        return Response::data(PaymentResource::collection($transactions), $transactions->count());
    }

    /**
     * @OA\Post(
     *     path="/api/wallet/withdraw",
     *     summary="Gửi yêu cầu rút tiền",
     *     tags={"Payment"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
    *             required={"amount", "bank_account", "note"},
    *             @OA\Property(property="amount", type="number", format="float", example=500000),
    *             @OA\Property(property="bank_account", type="string", example="0123456789 - Ngân hàng ACB"),
    *             @OA\Property(property="note", type="string", example="Rút tiền sau khoá học")
    *         )
     *     ),
     *     @OA\Response(response=200, description="Yêu cầu rút tiền đã được gửi")
     * )
     */
    public function requestWithdraw(CreateWithdrawRequest $request)
    {
        $user = $request->user();

        if ($user->money < $request->amount) {
            return Response::data(['message' => 'Số dư không đủ'], 400);
        }

        $withdraw = Payment::create([
            'user_id' => $user->id,
            'type' => 'withdraw',
            'amount' => $request->amount,
            'bank_account' => $request->bank_account,
            'note' => $request->note,
            'status' => 'pending'
        ]);

        return Response::data();
    }

    /**
     * @OA\Get(
     *     path="/api/wallet",
     *     summary="Danh sách tất cả giao dịch ví (Admin)",
     *     tags={"Payment"},
     *     @OA\Response(response=200, description="Danh sách giao dịch")
     * )
     */
    public function index()
    {
        $transactions = Payment::with('user')->orderByDesc('created_at')->get();
        return Response::data(PaymentResource::collection($transactions), $transactions->count());
    }

    /**
     * @OA\Post(
     *     path="/api/wallet/withdraw/{id}/approve",
     *     summary="Duyệt yêu cầu rút tiền (Admin)",
     *     tags={"Payment"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Yêu cầu đã được duyệt")
     * )
     */
    public function approveWithdraw($id)
    {
        $withdraw = Payment::where('type', 'withdraw')->where('status', 'pending')->findOrFail($id);

        DB::transaction(function () use ($withdraw) {
            $withdraw->status = 'completed';
            $withdraw->save();

            $withdraw->user->money -= $withdraw->amount;
            $withdraw->user->save();
        });

        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/wallet/withdraw/{id}/reject",
     *     summary="Từ chối yêu cầu rút tiền (Admin)",
     *     tags={"Payment"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Yêu cầu đã bị từ chối")
     * )
     */
    public function rejectWithdraw($id)
    {
        $withdraw = Payment::where('type', 'withdraw')->where('status', 'pending')->findOrFail($id);
        $withdraw->status = 'failed';
        $withdraw->save();

        return Response::data();
    }
}
