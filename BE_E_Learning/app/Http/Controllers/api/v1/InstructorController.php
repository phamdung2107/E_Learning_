<?php

namespace App\Http\Controllers\api\v1;

use App\Models\Instructor;
use App\Models\User;
use App\Models\Course;
use App\Http\Controllers\Controller;
use App\Http\Resources\InstructorResource;
use App\Http\Requests\UpdateInstructorRequest;
use App\Http\Requests\CreateInstructorRequest;
use App\Helper\Response;
use App\Mail\InstructorRequestStatusMail;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class InstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Instructor::with('user') // eager load
        ->when($request->experience_years, function ($q) use ($request) {
            $q->where('experience_years', '>=', $request->experience_years);
        })
        ->when($request->search, function ($q) use ($request) {
            $q->whereHas('user', function ($userQuery) use ($request) {
                $userQuery->where('full_name', 'like', "%{$request->search}%")
                    ->orWhere('email', 'like', "%{$request->search}%");
            });
        })
        ->when($request->status, function ($q) use ($request) {
            $q->whereHas('user', function ($userQuery) use ($request) {
                $userQuery->where('status', $request->status);
            });
        });

        $instructors = $query->paginate(10);

        return Response::data(InstructorResource::collection($instructors),$instructors->total());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateInstructorRequest $request)
    {
        $data = $request->validated();

        $user = User::where('id', $data['user_id'])->where('deleted', 0)->first();

        if (!$user) {
            return response()->json([
                'status' => 422,
                'message' => 'Người dùng không tồn tại hoặc đã bị xóa.'
            ], 422);
        }

        if (Instructor::where('user_id', $data['user_id'])->exists()) {
            return response()->json([
                'status' => 422,
                'message' => 'Người dùng này đã là giảng viên.'
            ], 422);
        }
        $instructor = Instructor::create($data);
        $user->role = 'instructor';
        $user->save();

        return Response::data(new InstructorResource($instructor));
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return Response::data(new InstructorResource(Instructor::with('user')->findOrFail($id)));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInstructorRequest $request, $id)
    {
        $instructor = Instructor::findOrFail($id);
        $instructor->update($request->only(['bio', 'experience_years', 'linkedin_url']));

        return Response::data(new InstructorResource($instructor));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $instructor = Instructor::findOrFail($id);

        // Tìm user liên kết và cập nhật cột 'role' nếu có
        if ($instructor->user_id && $user = $instructor->user) {
            $user->role = 'student';   // 👉 Chỉ gán giá trị 'student' vào cột role
            $user->save();
        }

        $instructor->delete();

        return Response::data();
    }

    public function requestInstructor(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'instructor') {
            return response()->json([
                'status' => 422,
                'message' => 'Bạn đã là giảng viên.'
            ], 422);
        }

        $exists = Instructor::where('user_id', $user->id)->exists();
        if ($exists) {
            return response()->json([
                'status' => 422,
                'message' => 'Bạn đã gửi yêu cầu trở thành giảng viên trước đó. Vui lòng chờ xét duyệt.'
            ], 422);
        }

        Instructor::create([
            'user_id' => $user->id,
            'bio' => $request->input('bio'),
            'experience_years' => $request->input('experience_years'),
            'linkedin_url' => $request->input('linkedin_url'),
        ]);

        Mail::to($user->email)->send(new InstructorRequestStatusMail(
            'Chúng tôi đã nhận được yêu cầu đăng ký giảng viên của bạn. Vui lòng chờ phê duyệt.'
        ));

        return Response::data([
            'message' => 'Yêu cầu của bạn đã được ghi nhận.'
        ]);
    }

    public function approveInstructor($userId)
    {
        $user = User::findOrFail($userId);

        $user->role = 'instructor';
        $user->save();

        Mail::to($user->email)->send(new InstructorRequestStatusMail(
            'Yêu cầu của bạn đã được chấp thuận. Bạn hiện đã là giảng viên trên nền tảng.'
        ));

        return Response::data();
    }

    public function rejectInstructor($userId)
    {
        $user = User::findOrFail($userId);

        // Xoá instructor tạm
        Instructor::where('user_id', $user->id)->delete();

        Mail::to($user->email)->send(new InstructorRequestStatusMail(
            'Rất tiếc, yêu cầu trở thành giảng viên của bạn đã bị từ chối.'
        ));

        return Response::data();

    }

    //  Lấy các khóa học của giảng viên
    public function getCourses($id)
    {
        $instructor = Instructor::findOrFail($id);
        $courses = $instructor->courses()->withCount('enrollments')->get();
        return Response::data($courses, $courses->count());
    }

    //  Tổng doanh thu từ các khóa học
    public function getRevenue($id)
    {
        // $instructor = Instructor::findOrFail($id);

        // $revenue = \DB::table('courses as c')
        //     ->join('order_items as oi', 'c.id', '=', 'oi.course_id')
        //     ->where('c.instructor_id', $instructor->id)
        //     ->where('c.deleted', 0)
        //     ->where('oi.deleted', 0)
        //     ->sum('oi.price');

        // return Response::data(['revenue' => (float)$revenue], 1);
    }


    //  Danh sách học viên của giảng viên
    public function getStudents($id)
    {
        $studentIds = DB::table('enrollments')
        ->join('courses', 'enrollments.course_id', '=', 'courses.id')
        ->where('courses.instructor_id', $id)
        ->distinct()
        ->pluck('enrollments.user_id');

        $students = User::whereIn('id', $studentIds)->get();

        return Response::data($students, $students->count());
    }

    // Top giảng viên theo doanh thu
    public function TopInstructors()
    {
        $instructors = \DB::table('courses as c')
            ->join('order_items as oi', 'c.id', '=', 'oi.course_id')
            ->select('c.instructor_id', \DB::raw('SUM(oi.price) as total'))
            ->where('c.deleted', 0)
            ->where('oi.deleted', 0)
            ->groupBy('c.instructor_id')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        return Response::data($instructors, $instructors->count());
    }

    //  Lấy instructor theo user ID
    public function getInstructorByUserId($userId)
    {
        $instructor = Instructor::where('user_id', $userId)->firstOrFail();

        return Response::data(new InstructorResource($instructor));
    }

}
