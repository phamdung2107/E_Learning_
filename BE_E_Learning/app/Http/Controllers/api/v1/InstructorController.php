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

/**
 * @OA\Tag(
 *     name="Instructor",
 *     description="Quản lý giảng viên"
 * )
 */
class InstructorController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/instructors",
     *     summary="Lấy danh sách giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="experience_years", in="query", @OA\Schema(type="integer")),
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="status", in="query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Danh sách giảng viên")
     * )
     */
    public function index(Request $request)
    {
        $query = Instructor::with('user')
            ->when($request->experience_years, fn($q) => $q->where('experience_years', '>=', $request->experience_years))
            ->when($request->search, fn($q) => $q->whereHas('user', fn($u) => $u->where('full_name', 'like', "%{$request->search}%")->orWhere('email', 'like', "%{$request->search}%")))
            ->when($request->status, fn($q) => $q->whereHas('user', fn($u) => $u->where('status', $request->status)));

        $Instructor = $query->paginate(10);

        return Response::data(InstructorResource::collection($Instructor), $Instructor->total());
    }

    /**
     * @OA\Post(
     *     path="/api/instructors",
     *     summary="Tạo mới giảng viên",
     *     tags={"Instructor"},
     *     @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             required={"user_id", "bio", "experience"},
    *             @OA\Property(property="user_id", type="integer", example=12),
    *             @OA\Property(property="bio", type="string", example="Giảng viên có hơn 10 năm kinh nghiệm về CNTT."),
    *             @OA\Property(property="experience", type="string", example="Từng giảng dạy tại nhiều trường đại học lớn."),
    *         )
    *     ),
     *     @OA\Response(response=200, description="Tạo thành công")
     * )
     */
    public function store(CreateInstructorRequest $request)
    {
        $data = $request->validated();

        $user = User::where('id', $data['user_id'])->where('deleted', 0)->first();
        if (!$user) return response()->json(['message' => 'Người dùng không tồn tại hoặc đã bị xóa.'], 422);

        if (Instructor::where('user_id', $data['user_id'])->exists()) {
            return response()->json(['message' => 'Người dùng này đã là giảng viên.'], 422);
        }

        $instructor = Instructor::create($data);
        $user->role = 'instructor';
        $user->save();

        return Response::data(new InstructorResource($instructor));
    }

    /**
     * @OA\Get(
     *     path="/api/instructors/{id}",
     *     summary="Xem chi tiết giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Thông tin chi tiết")
     * )
     */
    public function show($id)
    {
        return Response::data(new InstructorResource(Instructor::with('user')->findOrFail($id)));
    }

    /**
     * @OA\Put(
     *     path="/api/instructors/{id}",
     *     summary="Cập nhật giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
    *      @OA\RequestBody(
    *         required=true,
    *         @OA\JsonContent(
    *             @OA\Property(property="bio", type="string", example="Thông tin tiểu sử cập nhật."),
    *             @OA\Property(property="experience", type="string", example="Hơn 15 năm kinh nghiệm thực tiễn."),
    *         )
    *     ),
     *     @OA\Response(response=200, description="Cập nhật thành công")
     * )
     */
    public function update(UpdateInstructorRequest $request, $id)
    {
        $instructor = Instructor::findOrFail($id);
        $instructor->update($request->only(['bio', 'experience_years', 'linkedin_url']));
        return Response::data(new InstructorResource($instructor));
    }

    /**
     * @OA\Delete(
     *     path="/api/instructors/{id}",
     *     summary="Xoá giảng viên (chuyển vai trò về student)",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Xoá thành công")
     * )
     */
    public function destroy($id)
    {
        $instructor = Instructor::findOrFail($id);
        if ($instructor->user_id && $user = $instructor->user) {
            $user->role = 'student';
            $user->save();
        }
        $instructor->delete();
        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/instructors/request",
     *     summary="Gửi yêu cầu trở thành giảng viên",
     *     tags={"Instructor"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             required={"bio","experience_years"},
     *             @OA\Property(property="bio", type="string"),
     *             @OA\Property(property="experience_years", type="integer"),
     *             @OA\Property(property="linkedin_url", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Yêu cầu đã được ghi nhận")
     * )
     */
    public function requestInstructor(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'instructor') {
            return response()->json(['message' => 'Bạn đã là giảng viên.'], 422);
        }

        if (Instructor::where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Bạn đã gửi yêu cầu trở thành giảng viên.'], 422);
        }

        Instructor::create([
            'user_id' => $user->id,
            'bio' => $request->input('bio'),
            'experience_years' => $request->input('experience_years'),
            'linkedin_url' => $request->input('linkedin_url'),
        ]);

        Mail::to($user->email)->send(new InstructorRequestStatusMail('Chúng tôi đã nhận được yêu cầu đăng ký giảng viên của bạn.'));

        return Response::data(['message' => 'Yêu cầu của bạn đã được ghi nhận.']);
    }

    /**
     * @OA\Post(
     *     path="/api/instructors/approve/{userId}",
     *     summary="Duyệt yêu cầu giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Duyệt thành công")
     * )
     */
    public function approveInstructor($userId)
    {
        $user = User::findOrFail($userId);
        $user->role = 'instructor';
        $user->save();

        Mail::to($user->email)->send(new InstructorRequestStatusMail('Yêu cầu của bạn đã được chấp thuận.'));
        return Response::data();
    }

    /**
     * @OA\Post(
     *     path="/api/instructors/reject/{userId}",
     *     summary="Từ chối yêu cầu giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Từ chối thành công")
     * )
     */
    public function rejectInstructor($userId)
    {
        $user = User::findOrFail($userId);
        Instructor::where('user_id', $user->id)->delete();

        Mail::to($user->email)->send(new InstructorRequestStatusMail('Rất tiếc, yêu cầu của bạn đã bị từ chối.'));
        return Response::data();
    }

    /**
     * @OA\Get(
     *     path="/api/instructors/{id}/courses",
     *     summary="Lấy danh sách khoá học của giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách khoá học")
     * )
     */
    public function getCourses($id)
    {
        $instructor = Instructor::findOrFail($id);
        $courses = $instructor->courses()->withCount('enrollments')->get();
        return Response::data($courses, $courses->count());
    }

    /**
     * @OA\Get(
     *     path="/api/instructors/{id}/students",
     *     summary="Lấy danh sách học viên của giảng viên",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách học viên")
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/instructors/top/revenue",
     *     summary="Top giảng viên theo doanh thu",
     *     tags={"Instructor"},
     *     @OA\Response(response=200, description="Top giảng viên")
     * )
     */
    public function TopInstructor()
    {
        $Instructor = \DB::table('courses as c')
            ->join('orders as o', 'c.id', '=', 'o.course_id')
            ->select('c.instructor_id', \DB::raw('SUM(o.price) as total'))
            ->where('c.deleted', 0)
            ->where('o.deleted', 0)
            ->where('o.status', 'paid') // giả sử chỉ tính doanh thu khi đã thanh toán
            ->groupBy('c.instructor_id')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        return Response::data($Instructor, $Instructor->count());
    }

        /**
     * @OA\Get(
     *     path="/api/instructors/{id}/revenue",
     *     summary="Lấy tổng doanh thu của giảng viên",
     *     tags={"Instructor"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID của giảng viên",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công. Trả về tổng doanh thu của giảng viên.",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="revenue", type="number", format="float", example=1250000)
     *             ),
     *             @OA\Property(property="message", type="string", example="Success")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Không tìm thấy giảng viên"
     *     )
     * )
     */

    public function getRevenue($id)
    {
        $instructor = Instructor::findOrFail($id);

        $revenue = \DB::table('courses as c')
            ->join('orders as o', 'c.id', '=', 'o.course_id')
            ->where('c.instructor_id', $instructor->id)
            ->where('c.deleted', 0)
            ->where('o.deleted', 0)
            ->where('o.status', 'paid') // chỉ tính đơn đã thanh toán
            ->sum('o.price');

        return Response::data(['revenue' => (float)$revenue], 1);
    }


    /**
     * @OA\Get(
     *     path="/api/instructors/by-user/{userId}",
     *     summary="Lấy thông tin giảng viên từ user ID",
     *     tags={"Instructor"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Thông tin giảng viên")
     * )
     */
    public function getInstructorByUserId($userId)
    {
        $instructor = Instructor::where('user_id', $userId)->firstOrFail();
        return Response::data(new InstructorResource($instructor));
    }
}
