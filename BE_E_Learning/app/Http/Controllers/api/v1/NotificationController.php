<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Http\Resources\NotificationResource;
use App\Helper\Response;

class NotificationController extends Controller
{
    // [1] Danh sách tất cả thông báo của người dùng (có thể search)
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Notification::where('user_id', $user->id);

        $notifications = $query->orderByDesc('created_at')->get();
        return Response::data(NotificationResource::collection($notifications), $notifications->count());
    }

    // [2] Lấy các thông báo chưa đọc
    public function unread(Request $request)
    {
        $user = $request->user();
        $notifications = Notification::where('user_id', $user->id)->where('is_read', false)->get();
        return Response::data(NotificationResource::collection($notifications), $notifications->count());
    }

    // [3] Đánh dấu là đã đọc
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->is_read = true;
        $notification->save();

        return Response::data([]);
    }

    // [4] Xoá mềm thông báo
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return Response::data(['message' => 'Thông báo đã xoá']);
    }

    // [5] Chi tiết thông báo
    public function show($id)
    {
        $notification = Notification::findOrFail($id);
        return Response::data(new NotificationResource($notification));
    }
}
