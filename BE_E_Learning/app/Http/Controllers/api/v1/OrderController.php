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
    // [1] Tạo đơn hàng khi người dùng ấn "Mua khóa học"
    public function create(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'course_id' => 'required|exists:courses,id'
        ]);

        $course = Course::findOrFail($data['course_id']);

        // Kiểm tra đã từng tạo đơn chưa
        $exists = Order::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->whereIn('status', ['pending', 'paid'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Bạn đã có đơn hàng cho khóa học này.'], 400);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'price' => $course->price,
            'status' => 'pending',
            'payment_method' => 'wallet'
        ]);

        return Response::data(new OrderResource($order));
    }

    // [2] Xác nhận thanh toán đơn hàng
    public function confirm(Request $request, $id)
    {
        $user = $request->user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Đơn hàng không hợp lệ để xác nhận.'], 400);
        }

        if ($user->money < $order->price) {
            return response()->json(['message' => 'Số dư không đủ để thanh toán'], 400);
        }

        DB::beginTransaction();
        try {
            $user->money -= $order->price;
            $user->save();

            $order->status = 'paid';
            $order->save();

            Enrollment::create([
                'user_id' => $user->id,
                'course_id' => $order->course_id,
                'status' => 'active'
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

    // [3] Hủy đơn hàng
    public function cancel(Request $request, $id)
    {
        $user = $request->user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Không thể hủy đơn hàng đã xử lý.'], 400);
        }

        $order->status = 'canceled';
        $order->save();

        return Response::data(['message' => 'Đã hủy đơn hàng']);
    }

    // [4] Danh sách đơn hàng
    public function index(Request $request)
    {
        $user = $request->user();
        $orders = Order::where('user_id', $user->id)->latest()->get();
        return Response::data(OrderResource::collection($orders), $orders->count());
    }

    // [5] Chi tiết đơn hàng
    public function show($id)
    {
        $order = Order::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        return Response::data(new OrderResource($order));
    }

    // [6] Xoá mềm đơn hàng
    public function destroy($id)
    {
        $order = Order::where('id', $id)->where('user_id', auth()->id())->firstOrFail();
        $order->deleted = true;
        $order->save();

        return Response::data(['message' => 'Đơn hàng đã được xoá.']);
    }
}
