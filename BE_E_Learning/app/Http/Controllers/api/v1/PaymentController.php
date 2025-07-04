<?php

namespace App\Http\Controllers\Api\v1;

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

    public function handleVNPayReturn(Request $request)
    {
       $vnp_HashSecret = env('VNP_HASH_SECRET');

        // Bước 1: Lấy tất cả các tham số vnp_* ngoại trừ hash
        $inputData = [];
        foreach ($request->all() as $key => $value) {
            if (strpos($key, 'vnp_') === 0 && $key !== 'vnp_SecureHash' && $key !== 'vnp_SecureHashType') {
                $inputData[$key] = $value;
            }
        }

        // Bước 2: Sắp xếp theo thứ tự A-Z
        ksort($inputData);

        // Bước 3: Tạo chuỗi hashData đúng định dạng: key=urlencode(value)&...
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

        // Bước 4: Tạo secure hash
        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        // So sánh
        if ($secureHash !== $request->input('vnp_SecureHash')) {
            return Response::data(['message' => 'Sai checksum'], 400);
        }

        // ✅ Đúng checksum → xử lý nạp tiền như cũ
        $topup = Payment::find($request->vnp_TxnRef);
        if (!$topup || $topup->status !== 'pending') {
            return Response::data(['message' => 'Top-up không hợp lệ'], 400);
        }
        if ($request->vnp_ResponseCode === '00') {
            DB::beginTransaction();
            try {
                $bonus = 0;

                // Tìm sự kiện ưu đãi đang hoạt động
                $activeEvent = Event::where('status', true)
                    ->where('start_time', '<=', now())
                    ->where('end_time', '>=', now())
                    ->first();

                if ($activeEvent) {
                    $bonus = round($topup->amount * ($activeEvent->bonus_percent / 100), 2);
                }

                // Cập nhật topup và cộng tiền
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


    // [1] Lịch sử giao dịch của user
    public function myTransactions(Request $request)
    {
        $user = $request->user();
        $transactions = Payment::where('user_id', $user->id)->orderByDesc('created_at')->get();
        return Response::data(PaymentResource::collection($transactions), $transactions->count());
    }

    // [2] Gửi yêu cầu rút tiền
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
            'note' => $request -> note,
            'status' => 'pending'
        ]);

        return Response::data();
    }

    // [3] Danh sách tất cả giao dịch ví (admin)
    public function index()
    {
        $transactions = Payment::with('user')->orderByDesc('created_at')->get();
        return Response::data(PaymentResource::collection($transactions), $transactions->count());
    }

    // [4] Admin duyệt rút tiền
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

    // [5] Admin từ chối rút tiền
    public function rejectWithdraw($id)
    {
        $withdraw = Payment::where('type', 'withdraw')->where('status', 'pending')->findOrFail($id);
        $withdraw->status = 'failed';
        $withdraw->save();

        return Response::data();
    }
}
