<?php

namespace App\Http\Controllers\Api\v1;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Course;
use App\Models\Notification;
use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Http\Resources\CertificateResource;
use App\Helper\Response;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
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


    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'course_id' => 'required|exists:courses,id',
        ]);

        $user = User::findOrFail($validated['user_id']);
        $course = Course::findOrFail($validated['course_id']);
        $issueDate = Carbon::now()->format('d/m/Y');

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
            'user_id' => $cert->user_id,
            'type' => 'system',
            'title' => 'Chúc mừng bạn nhận chứng chỉ!',
            'message' => "Bạn đã hoàn thành khóa học '{$cert->course->title}' và nhận được chứng chỉ."
        ]);

        return Response::data(new CertificateResource($certificate));
    }

    public function show($id)
    {
        $cert = Certificate::with(['user', 'course'])->findOrFail($id);
        return Response::data(new CertificateResource($cert));
    }

    public function destroy($id)
    {
        $cert = Certificate::findOrFail($id);
        $cert->delete();
        return Response::data(['message' => 'Chứng chỉ đã được xoá']);
    }
}
