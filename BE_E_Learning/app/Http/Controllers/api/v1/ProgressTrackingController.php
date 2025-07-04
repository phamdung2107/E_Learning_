<?php

namespace App\Http\Controllers\Api\v1;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProgressTrackingResource;
use App\Http\Requests\CreateProgressTrackingRequest;
use App\Http\Requests\UpdateProgressTrackingRequest;
use App\Models\ProgressTracking;
use App\Helper\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProgressTrackingController extends Controller
{
    // [1] Danh sách tất cả tiến độ
    public function index()
    {
        $progress = ProgressTracking::get();
        return Response::data(ProgressTrackingResource::collection($progress), $progress->count());
    }

    // [2] Chi tiết tiến độ
    public function show($id)
    {
        $progress = ProgressTracking::findOrFail($id);
        return Response::data(new ProgressTrackingResource($progress));
    }

    // [3] Tạo tiến độ
    public function store(CreateProgressTrackingRequest $request)
    {
        $progress = ProgressTracking::create($request->validated());
        return Response::data(new ProgressTrackingResource($progress));
    }

    // [4] Cập nhật tiến độ
    public function update(UpdateProgressTrackingRequest $request, $id)
    {
        $progress = ProgressTracking::findOrFail($id);
        $progress->update($request->validated());
        return Response::data(new ProgressTrackingResource($progress));
    }

    // [5] Xoá mềm tiến độ
    public function destroy($id)
    {
        $progress = ProgressTracking::findOrFail($id);
        $progress->delete();
        return Response::data(['message' => 'Xoá tiến độ thành công']);
    }

    // [6] Lấy tiến độ học tập theo user + course
    public function getByUserCourse($userId, $courseId)
    {
        $items = ProgressTracking::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->get();

        return Response::data(ProgressTrackingResource::collection($items), $items->count());
    }

    // [7] Đánh dấu hoàn thành bài học
    public function completeLesson(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
            'lesson_id' => 'required|exists:lessons,id',
        ]);

        $track = ProgressTracking::updateOrCreate(
            [
                'user_id' => $data['user_id'],
                'course_id' => $data['course_id'],
                'lesson_id' => $data['lesson_id']
            ],
            [
                'is_completed' => true,
            ]
        );

        return Response::data(new ProgressTrackingResource($track));
    }
}
