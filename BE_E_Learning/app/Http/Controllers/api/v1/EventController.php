<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Http\Requests\CreateEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Helper\Response;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // [1] Danh sách sự kiện (có thể tìm kiếm theo tên)
    public function index(Request $request)
    {
        $query = Event::query()->where('deleted', false);

        if ($request->has('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        $events = $query->orderByDesc('start_time')->get();

        return Response::data(EventResource::collection($events), $events->count());
    }

    // [2] Tạo sự kiện mới
    public function store(CreateEventRequest $request)
    {
        $event = Event::create($request->validated());
        return Response::data();
    }

    // [3] Xem chi tiết
    public function show($id)
    {
        $event = Event::where('deleted', false)->findOrFail($id);
        return Response::data(new EventResource($event));
    }

    // [4] Cập nhật
    public function update(UpdateEventRequest $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->validated());
        return Response::data();
    }

    // [5] Xóa mềm
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return Response::data();
    }

    // [6] Kích hoạt / vô hiệu hóa sự kiện
    public function toggleStatus($id)
    {
        $event = Event::findOrFail($id);
        $event->status = !$event->status;
        $event->save();
        return Response::data();
    }
}
