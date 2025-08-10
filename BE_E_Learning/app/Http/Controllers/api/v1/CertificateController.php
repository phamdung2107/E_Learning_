<?php

namespace App\Http\Controllers\api\v1;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Http\Resources\CertificateResource;
use App\Helper\Response;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Certificate",
 *     description="Quản lý chứng chỉ khóa học"
 * )
 */
class CertificateController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/certificates",
     *     summary="Lấy danh sách chứng chỉ",
     *     tags={"Certificate"},
     *     @OA\Parameter(
     *         name="user",
     *         in="query",
     *         description="ID người dùng",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="course",
     *         in="query",
     *         description="ID khóa học",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách chứng chỉ"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Certificate::with(['user', 'course']);

        if ($request->has('user')) {
            $query->where('user_id', $request->input('user'));
        }

        if ($request->has('course')) {
            $query->where('course_id', $request->input('course'));
        }

        $certs = $query->get();

        return Response::data(CertificateResource::collection($certs), $certs->count());
    }

    /**
     * @OA\Post(
     *     path="/api/certificates",
     *     summary="Tạo chứng chỉ cho học viên",
     *     tags={"Certificate"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"user_id", "course_id"},
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="course_id", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Chứng chỉ được tạo thành công"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = User::findOrFail($validated['user_id']);
        $course = Course::findOrFail($validated['course_id']);
        $issueDate = Carbon::now()->format('d/m/Y');

        $updated = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->update(['status' => 'completed']);

        // Tạo nội dung PDF từ view
        $pdf = Pdf::loadView('certificates.template', [
            'user_name' => $user->full_name,
            'course_title' => $course->title,
            'issue_date' => $issueDate,
        ]);

        // Tạo tên file và lưu vào storage
        $fileName = 'certificates/' . Str::uuid() . '.pdf';
        Storage::disk('public')->put($fileName, $pdf->output());

        // Tạo bản ghi
        $certificate = Certificate::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'issue_date' => Carbon::now(),
            'certificate_url' => asset('storage/' . $fileName),
        ]);

        Notification::create([
            'user_id' => $certificate->user_id,
            'type' => 'system',
            'title' => 'Chúc mừng bạn nhận chứng chỉ!',
            'message' => "Bạn đã hoàn thành khóa học '{$certificate->course->title}' và nhận được chứng chỉ."
        ]);

        return Response::data(new CertificateResource($certificate));
    }

    /**
     * @OA\Get(
     *     path="/api/certificates/{id}",
     *     summary="Xem chi tiết chứng chỉ",
     *     tags={"Certificate"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID chứng chỉ",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Chi tiết chứng chỉ"
     *     )
     * )
     */
    public function show($id)
    {
        $cert = Certificate::with(['user', 'course'])->findOrFail($id);
        return Response::data(new CertificateResource($cert));
    }

    /**
     * @OA\Delete(
     *     path="/api/certificates/{id}",
     *     summary="Xoá chứng chỉ",
     *     tags={"Certificate"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID chứng chỉ",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Xoá chứng chỉ thành công"
     *     )
     * )
     */
    public function destroy($id)
    {
        $cert = Certificate::findOrFail($id);
        $cert->delete();
        return Response::data(['message' => 'Chứng chỉ đã được xoá']);
    }
}
