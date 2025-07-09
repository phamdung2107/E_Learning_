<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\User;
use App\Models\Notification;
use App\Http\Resources\EnrollmentResource;
use App\Http\Resources\CourseResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Helper\Response;

/**
 * @OA\Tag(
 *     name="Enrollment",
 *     description="Quản lý lượt đăng ký khóa học"
 * )
 */
class EnrollmentController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/enrollments",
     *     summary="Danh sách toàn bộ lượt đăng ký",
     *     tags={"Enrollment"},
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách lượt đăng ký"
     *     )
     * )
     */
    public function index()
    {
        $enrollments = Enrollment::with(['user', 'course'])->get();
        return Response::data(EnrollmentResource::collection($enrollments), $enrollments->count());
    }

    /**
     * @OA\Get(
     *     path="/api/enrollments/{id}",
     *     summary="Xem chi tiết lượt đăng ký",
     *     tags={"Enrollment"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID lượt đăng ký",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Thông tin lượt đăng ký")
     * )
     */
    public function show($id)
    {
        $enrollment = Enrollment::with(['user', 'course'])->findOrFail($id);
        return Response::data(new EnrollmentResource($enrollment));
    }

    /**
     * @OA\Get(
     *     path="/api/enrollments/user/{userId}",
     *     summary="Lấy danh sách khóa học đã đăng ký của user",
     *     tags={"Enrollment"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="ID người dùng",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách khoá học")
     * )
     */
    public function getCoursesByUser($userId)
    {
        $courses = Enrollment::where('user_id', $userId)  
            ->with('course')
            ->get()
            ->pluck('course');

        return Response::data(CourseResource::collection($courses), $courses->count());
    }

    /**
     * @OA\Get(
     *     path="/api/enrollments/course/{courseId}",
     *     summary="Lấy danh sách học viên đã đăng ký 1 khóa học",
     *     tags={"Enrollment"},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách học viên")
     * )
     */
    public function getUsersByCourse($courseId)
    {
        $users = Enrollment::where('course_id', $courseId)
            ->with('user')
            ->get()
            ->pluck('user');

        return Response::data(UserResource::collection($users), $users->count());
    }

    /**
     * @OA\Get(
     *     path="/api/enrollments/count/{courseId}",
     *     summary="Đếm số lượt đăng ký của một khóa học",
     *     tags={"Enrollment"},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Số lượt đăng ký")
     * )
     */
    public function countEnrollments($courseId)
    {
        $count = Enrollment::where('course_id', $courseId)->count();
        return Response::data(['enrolled' => $count]);
    }

    /**
     * @OA\Get(
     *     path="/api/enrollments/top/courses",
     *     summary="Top khóa học theo lượt đăng ký",
     *     tags={"Enrollment"},
     *     @OA\Response(response=200, description="Top 5 khoá học có nhiều lượt đăng ký nhất")
     * )
     */
    public function topCourses()
    {
        $result = Enrollment::select('course_id')
            ->groupBy('course_id')
            ->selectRaw('course_id, COUNT(*) as total')
            ->orderByDesc('total')
            ->take(5)
            ->with('course')
            ->get();

        return Response::data($result);
    }
}
