<?php

namespace App\Http\Controllers\api\v1;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProgressTrackingResource;
use App\Http\Requests\CreateProgressTrackingRequest;
use App\Http\Requests\UpdateProgressTrackingRequest;
use App\Models\ProgressTracking;
use App\Models\Enrollment;
use App\Helper\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProgressTrackingController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/progress",
     *     summary="Danh sách tất cả tiến độ",
     *     tags={"Progress Tracking"},
     *     @OA\Response(response=200, description="Danh sách tiến độ")
     * )
     */
    public function index()
    {
        $progress = ProgressTracking::get();
        return Response::data(ProgressTrackingResource::collection($progress), $progress->count());
    }

    /**
     * @OA\Get(
     *     path="/api/progress/{id}",
     *     summary="Chi tiết tiến độ",
     *     tags={"Progress Tracking"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Chi tiết tiến độ")
     * )
     */
    public function show($id)
    {
        $progress = ProgressTracking::findOrFail($id);
        return Response::data(new ProgressTrackingResource($progress));
    }

    /**
     * @OA\Post(
     *     path="/api/progress",
     *     summary="Tạo tiến độ",
     *     tags={"Progress Tracking"},
     *     @OA\RequestBody(required=true, @OA\JsonContent(
 *             required={"user_id", "course_id", "lesson_id"},
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="course_id", type="integer", example=5),
 *             @OA\Property(property="lesson_id", type="integer", example=10),
 *             @OA\Property(property="is_completed", type="boolean", example=true)
 *         )),
     *     @OA\Response(response=200, description="Tiến độ đã tạo")
     * )
     */
    public function store(CreateProgressTrackingRequest $request)
    {
        $progress = ProgressTracking::create($request->validated());
        return Response::data(new ProgressTrackingResource($progress));
    }

    /**
     * @OA\Put(
     *     path="/api/progress/{id}",
     *     summary="Cập nhật tiến độ",
     *     tags={"Progress Tracking"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(
 *             @OA\Property(property="is_completed", type="boolean", example=true)
 *         )),
     *     @OA\Response(response=200, description="Tiến độ đã cập nhật")
     * )
     */
    public function update(UpdateProgressTrackingRequest $request, $id)
    {
        $progress = ProgressTracking::findOrFail($id);
        $progress->update($request->validated());
        return Response::data(new ProgressTrackingResource($progress));
    }

    /**
     * @OA\Delete(
     *     path="/api/progress/{id}",
     *     summary="Xoá tiến độ",
     *     tags={"Progress Tracking"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Xoá tiến độ thành công")
     * )
     */
    public function destroy($id)
    {
        $progress = ProgressTracking::findOrFail($id);
        $progress->delete();
        return Response::data(['message' => 'Xoá tiến độ thành công']);
    }

    /**
     * @OA\Get(
     *     path="/api/progress/user/{userId}/course/{courseId}",
     *     summary="Lấy tiến độ học tập theo user và course",
     *     tags={"Progress Tracking"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Parameter(name="courseId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách tiến độ học tập")
     * )
     */
    public function getByUserCourse($userId, $courseId)
    {
        $items = ProgressTracking::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->get();

        return Response::data(ProgressTrackingResource::collection($items), $items->count());
    }

    /**
     * @OA\Post(
     *     path="/api/progress/complete",
     *     summary="Đánh dấu hoàn thành bài học",
     *     tags={"Progress Tracking"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id","course_id","lesson_id"},
     *             @OA\Property(property="user_id", type="integer"),
     *             @OA\Property(property="course_id", type="integer"),
     *             @OA\Property(property="lesson_id", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Đã đánh dấu hoàn thành")
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/progress/summary",
     *     summary="Lấy tổng số bài học và khóa học đã hoàn thành của user hiện tại",
     *     tags={"Progress Tracking"},
     *     @OA\Response(response=200, description="Thông tin tổng hợp tiến độ")
     * )
     */
    public function getSummaryForCurrentUser(Request $request)
    {
        $user = $request->user();

        $completedLessonsCount = ProgressTracking::where('user_id', $user->id)
            ->where('is_completed', true)
            ->count();

        $courseIds = ProgressTracking::where('user_id', $user->id)
            ->pluck('course_id')
            ->unique();

        $completedCoursesCount = 0;

        foreach ($courseIds as $courseId) {
            $totalLessons = \App\Models\Lesson::where('course_id', $courseId)->count();
            $completedLessons = ProgressTracking::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->where('is_completed', true)
                ->count();

            if ($totalLessons > 0 && $totalLessons === $completedLessons) {
                $completedCoursesCount++;
            }
        }

        return Response::data([
            'completed_lessons' => $completedLessonsCount,
            'completed_courses' => $completedCoursesCount,
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/progress/is-course-completed/user/{userId}/course/{courseId}",
     *     summary="Kiểm tra khóa học đã hoàn thành chưa",
     *     tags={"Progress Tracking"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Parameter(name="courseId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Trạng thái hoàn thành khóa học")
     * )
     */
    public function isCourseCompleted($userId, $courseId)
    {
        $totalLessons = \App\Models\Lesson::where('course_id', $courseId)->count();

        if ($totalLessons === 0) {
            return Response::data([
                'is_completed' => false,
                'message' => 'Khoá học không có bài học nào'
            ]);
        }

        $completedLessons = ProgressTracking::where('user_id', $userId)
            ->where('course_id', $courseId)
            ->where('is_completed', true)
            ->count();

        $isCompleted = ($totalLessons === $completedLessons);

        return Response::data([
            'is_completed' => $isCompleted,
            'total_lessons' => $totalLessons,
            'completed_lessons' => $completedLessons
        ]);
    }


    /**
     * @OA\Get(
     *     path="/api/progress/user/{userId}",
     *     summary="Kiểm tra tien trinh hoc cua nguoi dung",
     *     tags={"Progress Tracking"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="")
     * )
     */
    public function getProgressTrackingWithUser(Request $request, $userId)
    {
        $user = $request->user();
        $instructor = \App\Models\Instructor::where('user_id', $user->id)->first();
        $courseWithInstructor = \App\Models\Course::where('instructor_id', $instructor->id)->pluck('id');
        $enrollments = Enrollment::where('user_id', $userId)
            ->whereIn('course_id', $courseWithInstructor)
            ->pluck('course_id')
            ->unique();

        $result = [];

        foreach ($enrollments as $courseId) {
            $completedLessons = ProgressTracking::where('user_id', $userId)
                ->where('course_id', $courseId)
                ->where('is_completed', true)
                ->count();

            $totalLessons = \App\Models\Lesson::where('course_id', $courseId)->count();
            $course = \App\Models\Course::find($courseId);

            if (!$course) {
                continue;
            }

            $progressPercentage = $totalLessons > 0
                ? ($completedLessons / $totalLessons) * 100
                : 0;

            $result[] = [
                'course' => $course,
                'completed_lessons' => $completedLessons,
                'total_lessons' => $totalLessons,
                'progress_percentage' => $progressPercentage
            ];
        }

        return Response::data($result);
    }
}
