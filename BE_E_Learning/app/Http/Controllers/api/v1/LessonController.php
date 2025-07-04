<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Http\Resources\LessonResource;
use App\Http\Requests\CreateLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Helper\Response;
use App\Models\Notification;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    // [1] Danh sách bài học
    public function index(Request $request)
    {
        $query = Lesson::when($request->keyword, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $sub->where('title', 'like', '%' . $request->keyword . '%');
                });
            });

        $lessons = $query->get();

        return Response::data(LessonResource::collection($lessons), $lessons->count());
    }

    // [2] Tạo mới bài học
    public function store(CreateLessonRequest $request)
    {
        $lesson = Lesson::create($request->validated());

        // $enrolledUserIds = Enrollment::where('course_id', $lesson->course_id)->pluck('user_id');

        // foreach ($enrolledUserIds as $userId) {
        //     Notification::create([
        //         'user_id' => $userId,
        //         'type' => 'course',
        //         'title' => 'Bài học mới được cập nhật',
        //         'message' => "Khoá học '{$lesson->course->title}' vừa có bài học mới: '{$lesson->title}'."
        //     ]);
        // }

        return Response::data(new LessonResource($lesson));
    }

    // [3] Chi tiết bài học
    public function show($id)
    {
        $lesson = Lesson::findOrFail($id);
        return Response::data(new LessonResource($lesson));
    }

    // [4] Cập nhật bài học
    public function update(UpdateLessonRequest $request, $id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->update($request->validated());
        return Response::data(new LessonResource($lesson));
    }

    // [5] Xoá mềm bài học
    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();
        return Response::data(['message' => 'Lesson deleted']);
    }

    // [6] Danh sách bài học theo khoá học
    public function getByCourse($courseId)
    {
        $lessons = Lesson::where('course_id', $courseId)->where('deleted', 0)
            ->orderBy('order_number')->get();
        return Response::data(LessonResource::collection($lessons), $lessons->count());
    }
}