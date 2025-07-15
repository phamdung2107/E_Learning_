<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Helper\Response;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/orders",
     *     summary="Tạo đơn hàng khi người dùng ấn Mua khóa học",
     *     tags={"Order"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"course_id"},
     *             @OA\Property(property="course_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Đơn hàng đã được tạo")
     * )
     */
    public function create(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'course_id' => 'required|exists:courses,id'
        ]);

        $course = Course::findOrFail($data['course_id']);

        $exists = Order::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->whereIn('payment_status', ['pending', 'paid'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Bạn đã có đơn hàng cho khóa học này.'], 400);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'original_price' => $course->original_price,
            'payment_status' => 'pending',
            'payment_method' => 'wallet'
        ]);

        return Response::data(new OrderResource($order));
    }

    /**
     * @OA\Post(
     *     path="/api/orders/{id}/confirm",
     *     summary="Xác nhận thanh toán đơn hàng",
     *     tags={"Order"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Đã xác nhận thanh toán")
     * )
     */
    public function confirm(Request $request, $id)
    {
        $user = $request->user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        if ($order->payment_status !== 'pending') {
            return response()->json(['message' => 'Đơn hàng không hợp lệ để xác nhận.'], 400);
        }

        if ($user->money < $order->original_price) {
            return response()->json(['message' => 'Số dư không đủ để thanh toán'], 400);
        }

        DB::beginTransaction();
        try {
            $user->money -= $order->original_price;
            $user->save();

            $order->payment_status = 'paid';
            $order->save();

            Enrollment::create([
                'user_id' => $user->id,
                'course_id' => $order->course_id,
                'payment_status' => 'active'
            ]);

            Notification::create([
                'user_id' => $user->id,
                'type' => 'course_purchase',
                'title' => 'Mua khóa học thành công',
                'body' => 'Bạn đã mua khóa học thành công.'
            ]);

            DB::commit();
            return Response::data(new OrderResource($order));

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi khi thanh toán'], 500);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/orders/{id}/cancel",
     *     summary="Huỷ đơn hàng",
     *     tags={"Order"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Đơn hàng đã huỷ")
     * )
     */
    public function cancel(Request $request, $id)
    {
        $user = $request->user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        if ($order->payment_status !== 'pending') {
            return response()->json(['message' => 'Không thể hủy đơn hàng đã xử lý.'], 400);
        }

        $order->payment_status = 'canceled';
        $order->save();

        return Response::data(['message' => 'Đã hủy đơn hàng']);
    }

    /**
     * @OA\Get(
     *     path="/api/orders",
     *     summary="Danh sách đơn hàng của người dùng",
     *     tags={"Order"},
     *     @OA\Response(response=200, description="Danh sách đơn hàng")
     * )
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)->latest()->get();
        return Response::data(OrderResource::collection($orders), $orders->count());
    }

    /**
     * @OA\Get(
     *     path="/api/orders/{id}",
     *     summary="Chi tiết đơn hàng",
     *     tags={"Order"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Chi tiết đơn hàng")
     * )
     */
    public function show($id)
    {
        $order = Order::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        return Response::data(new OrderResource($order));
    }

    /**
     * @OA\Delete(
     *     path="/api/orders/{id}",
     *     summary="Xoá đơn hàng",
     *     tags={"Order"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Đơn hàng đã được xoá")
     * )
     */
    public function destroy($id)
    {
        $order = Order::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $order->deleted = true;
        $order->save();

        return Response::data(['message' => 'Đơn hàng đã được xoá.']);
    }
}
