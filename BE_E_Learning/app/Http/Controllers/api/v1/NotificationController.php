<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Resources\NotificationResource;
use App\Helper\Response;

class NotificationController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/notifications",
     *     summary="Danh sách tất cả thông báo của người dùng",
     *     tags={"Notification"},
     *     @OA\Response(response=200, description="Danh sách thông báo")
     * )
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Notification::where('user_id', $user->id);

        $notifications = $query->orderByDesc('created_at')->get();
        return Response::data(NotificationResource::collection($notifications), $notifications->count());
    }

    /**
     * @OA\Get(
     *     path="/api/notifications/unread",
     *     summary="Lấy danh sách thông báo chưa đọc",
     *     tags={"Notification"},
     *     @OA\Response(response=200, description="Thông báo chưa đọc")
     * )
     */
    public function unread(Request $request)
    {
        $user = $request->user();
        $notifications = Notification::where('user_id', $user->id)->where('is_read', false)->get();
        return Response::data(NotificationResource::collection($notifications), $notifications->count());
    }

    /**
     * @OA\Put(
     *     path="/api/notifications/{id}/read",
     *     summary="Đánh dấu thông báo đã đọc",
     *     tags={"Notification"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Thông báo đã đọc")
     * )
     */
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->is_read = true;
        $notification->save();

        return Response::data([]);
    }

    /**
     * @OA\Delete(
     *     path="/api/notifications/{id}",
     *     summary="Xoá mềm thông báo",
     *     tags={"Notification"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Thông báo đã xoá")
     * )
     */
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return Response::data(['message' => 'Thông báo đã xoá']);
    }

    /**
     * @OA\Get(
     *     path="/api/notifications/{id}",
     *     summary="Chi tiết thông báo",
     *     tags={"Notification"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Chi tiết thông báo")
     * )
     */
    public function show($id)
    {
        $notification = Notification::findOrFail($id);
        return Response::data(new NotificationResource($notification));
    }
}
