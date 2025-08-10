<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Enrollment;
use App\Http\Resources\LessonResource;
use App\Http\Requests\CreateLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Helper\Response;
use App\Models\Notification;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/lessons",
     *     summary="Lấy danh sách bài học",
     *     tags={"Lesson"},
     *     @OA\Parameter(
     *         name="keyword",
     *         in="query",
     *         description="Từ khóa tìm kiếm tiêu đề bài học",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Danh sách bài học")
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/lessons",
     *     summary="Tạo mới bài học",
     *     tags={"Lesson"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
    *             required={"title", "course_id", "video_url"},
    *             @OA\Property(property="title", type="string", example="Giới thiệu về HTML"),
    *             @OA\Property(property="course_id", type="integer", example=3),
    *             @OA\Property(property="content", type="string", example="Nội dung chi tiết bài học..."),
    *             @OA\Property(property="video_url", type="string", example="https://youtu.be/example"),
    *             @OA\Property(property="order_number", type="integer", example=1),
    *         )
     *     ),
     *     @OA\Response(response=200, description="Bài học đã tạo")
     * )
     */
    public function store(CreateLessonRequest $request)
    {
        $lesson = Lesson::create($request->validated());

        $enrolledUserIds = Enrollment::where('course_id', $lesson->course_id)->pluck('user_id');

        foreach ($enrolledUserIds as $userId) {
            Notification::create([
                'user_id' => $userId,
                'type' => 'course',
                'title' => 'Bài học mới được cập nhật',
                'message' => "Khoá học '{$lesson->course->title}' vừa có bài học mới: '{$lesson->title}'."
            ]);
        }

        return Response::data(new LessonResource($lesson));
    }

    /**
     * @OA\Get(
     *     path="/api/lessons/{id}",
     *     summary="Chi tiết bài học",
     *     tags={"Lesson"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Chi tiết bài học")
     * )
     */
    public function show($id)
    {
        $lesson = Lesson::with(['quizzes'])->findOrFail($id);
        return Response::data($lesson);
    }

    /**
     * @OA\Put(
     *     path="/api/lessons/{id}",
     *     summary="Cập nhật bài học",
     *     tags={"Lesson"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
    *             @OA\Property(property="title", type="string", example="Cập nhật bài học HTML"),
    *             @OA\Property(property="content", type="string", example="Nội dung mới..."),
    *             @OA\Property(property="video_url", type="string", example="https://youtu.be/new-example"),
    *             @OA\Property(property="order_number", type="integer", example=2),
    *         )
     *     ),
     *     @OA\Response(response=200, description="Bài học đã cập nhật")
     * )
     */
    public function update(UpdateLessonRequest $request, $id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->update($request->validated());
        return Response::data(new LessonResource($lesson));
    }

    /**
     * @OA\Delete(
     *     path="/api/lessons/{id}",
     *     summary="Xoá bài học",
     *     tags={"Lesson"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Đã xoá bài học")
     * )
     */
    public function destroy($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();
        return Response::data(['message' => 'Lesson deleted']);
    }

    /**
     * @OA\Get(
     *     path="/api/lessons/course/{courseId}",
     *     summary="Danh sách bài học theo khoá học",
     *     tags={"Lesson"},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách bài học theo khoá học")
     * )
     */
    public function getByCourse($courseId)
    {
        $lessons = Lesson::with('progressForCurrentUser')
            ->where('course_id', $courseId)
            ->where('deleted', 0)
            ->orderBy('order_number')
            ->get();

        return Response::data(LessonResource::collection($lessons), $lessons->count());
    }
}
