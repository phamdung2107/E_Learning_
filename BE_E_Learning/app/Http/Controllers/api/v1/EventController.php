<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Http\Requests\CreateEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Resources\EventResource;
use App\Helper\Response;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Event",
 *     description="Quản lý sự kiện"
 * )
 */
class EventController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/events",
     *     summary="Lấy danh sách sự kiện",
     *     tags={"Event"},
     *     @OA\Parameter(
     *         name="keyword",
     *         in="query",
     *         description="Từ khoá tìm kiếm theo tên sự kiện",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Danh sách sự kiện")
     * )
     */
    public function index(Request $request)
    {
        $query = Event::query()->where('deleted', false);

        if ($request->has('keyword')) {
            $query->where('name', 'like', '%' . $request->keyword . '%');
        }

        $events = $query->orderByDesc('start_time')->get();

        return Response::data(EventResource::collection($events), $events->count());
    }

    /**
     * @OA\Post(
     *     path="/api/events",
     *     summary="Tạo sự kiện mới",
     *     tags={"Event"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
    *             required={"name", "start_date", "end_date", "bonus_percent"},
    *             @OA\Property(property="name", type="string", example="Workshop AI"),
    *             @OA\Property(property="content", type="string", example="Buổi chia sẻ về AI và học máy"),
    *             @OA\Property(property="bonus_percent", type="integer", example=10),
    *             @OA\Property(property="start_date", type="string", format="date", example="2025-07-10"),
    *             @OA\Property(property="end_date", type="string", format="date", example="2025-07-11"),
    *         )
     *     ),
     *     @OA\Response(response=200, description="Tạo sự kiện thành công")
     * )
     */
    public function store(CreateEventRequest $request)
    {
        $data = $request->validated();
        $data['status'] = $data['status'] ?? true;

        $event = Event::create($data);
        return Response::data($event);
    }

    /**
     * @OA\Get(
     *     path="/api/events/{id}",
     *     summary="Xem chi tiết sự kiện",
     *     tags={"Event"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID sự kiện",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Thông tin sự kiện")
     * )
     */
    public function show($id)
    {
        $event = Event::where('deleted', false)->findOrFail($id);
        return Response::data(new EventResource($event));
    }

    /**
     * @OA\Put(
     *     path="/api/events/{id}",
     *     summary="Cập nhật sự kiện",
     *     tags={"Event"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID sự kiện",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
    *             @OA\Property(property="title", type="string", example="Workshop AI cập nhật"),
    *             @OA\Property(property="content", type="string", example="Mô tả cập nhật về sự kiện"),
    *             @OA\Property(property="bonus_percent", type="integer", example=10),
    *             @OA\Property(property="start_date", type="string", format="date", example="2025-07-12"),
    *             @OA\Property(property="end_date", type="string", format="date", example="2025-07-13"),
    *         )
     *     ),
     *     @OA\Response(response=200, description="Cập nhật thành công")
     * )
     */
    public function update(UpdateEventRequest $request, $id)
    {
        $event = Event::findOrFail($id);
        $event->update($request->validated());
        return Response::data();
    }

    /**
     * @OA\Delete(
     *     path="/api/events/{id}",
     *     summary="Xoá mềm sự kiện",
     *     tags={"Event"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID sự kiện",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Xoá thành công")
     * )
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/events/{id}/toggle",
     *     summary="Kích hoạt hoặc vô hiệu hoá sự kiện",
     *     tags={"Event"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID sự kiện",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Cập nhật trạng thái sự kiện")
     * )
     */
    public function toggleStatus($id)
    {
        $event = Event::findOrFail($id);
        $event->status = !$event->status;
        $event->save();
        return Response::data();
    }

    /**
     * @OA\Get(
     *      path="/api/events/maximum-bonus-percent",
     *      operationId="getMaximumBonusPercent",
     *      tags={"Event"},
     *      summary="Lấy phần trăm giảm giá tối đa",
     *      description="Lấy ra phần trăm giảm giá (bonus_percent) lớn nhất từ các sự kiện đang hoạt động. Trả về null nếu không có sự kiện nào đang hoạt động.",
     *      @OA\Response(
     *          response=200,
     *          description="Thao tác thành công",
     *      )
     * )
     */
    public function getMaximumBonusPercent()
    {
        $now = now();

        $topEvent = Event::where('deleted', false)
            ->where('status', true)
            ->where('start_time', '<=', $now)
            ->where('end_time', '>=', $now)
            ->orderByDesc('bonus_percent')
            ->first();

        if (!$topEvent) {
            $emptyEvent = new Event();
            return Response::data($emptyEvent, 0, 'Không có sự kiện nào đang hoạt động', 404);
        }

        return Response::data($topEvent);
    }
}