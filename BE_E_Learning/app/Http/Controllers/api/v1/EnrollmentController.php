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

class EnrollmentController extends Controller
{
    // [1] Danh sách toàn bộ lượt đăng ký 
    public function index()
    {
        $enrollments = Enrollment::with(['user', 'course'])->get();
        return Response::data(EnrollmentResource::collection($enrollments), $enrollments->count());
    }

    // [2] Đăng ký khóa học mới
    // public function enroll(Request $request)
    // {
    //     $data = $request->validate([
    //         'user_id' => 'required|exists:users,id',
    //         'course_id' => 'required|exists:courses,id'
    //     ]);

    //     $exists = Enrollment::where('user_id', $data['user_id'])
    //         ->where('course_id', $data['course_id'])
    //         ->exists();

    //     if ($exists) {
    //         return response()->json(['message' => 'Đã đăng ký khóa học này rồi'], 422);
    //     }

    //     $enroll = Enrollment::create($data);

    //     Notification::create([
    //         'user_id' => $user->id,
    //         'type' => 'course',
    //         'title' => 'Đăng ký khóa học thành công',
    //         'message' => "Bạn đã đăng ký khóa học '{$course->title}' thành công."
    //     ]);
    //     return Response::data();
    // }

    // [3] Huỷ đăng ký (xóa mềm)
    // public function cancel(Request $request)
    // {
    //     $data = $request->validate([
    //         'user_id' => 'required',
    //         'course_id' => 'required'
    //     ]);

    //     $enrollment = Enrollment::where('user_id', $data['user_id'])
    //         ->where('course_id', $data['course_id'])
    //         ->firstOrFail();

    //     $enrollment->delete();

    //     return Response::data(['message' => 'Huỷ đăng ký thành công']);
    // }

    // [4] Chi tiết lượt đăng ký
    public function show($id)
    {
        $enrollment = Enrollment::with(['user', 'course'])->findOrFail($id);
        return Response::data(new EnrollmentResource($enrollment));
    }

    // [5] Xóa mềm theo ID
    // public function destroy($id)
    // {
    //     $enrollment = Enrollment::findOrFail($id);
    //     $enrollment->delete();
    //     return Response::data(['message' => 'Xoá lượt đăng ký']);
    // }

    // [6] Danh sách khóa học đã đăng ký của 1 user
    public function getCoursesByUser($userId)
    {
        $courses = Enrollment::where('user_id', $userId)  
            ->with('course')
            ->get()
            ->pluck('course');

        return Response::data(CourseResource::collection($courses), $courses->count());
    }

    // [7] Danh sách học viên của 1 khóa học
    public function getUsersByCourse($courseId)
    {
        $users = Enrollment::where('course_id', $courseId)
            ->with('user')
            ->get()
            ->pluck('user');

        return Response::data(UserResource::collection($user), $users->count());
    }

    // [8] Đếm lượt đăng ký theo khoá học
    public function countEnrollments($courseId)
    {
        $count = Enrollment::where('course_id', $courseId)->count();
        return Response::data(['enrolled' => $count]);
    }

    // [9] Top khóa học theo lượt đăng ký
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
