<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Http\Resources\CourseResource;
use App\Http\Requests\CreateCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Helper\Response;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Course",
 *     description="Quản lý khoá học"
 * )
 */
class CourseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/courses",
     *     summary="Lấy danh sách khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Tìm theo tiêu đề",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="Lọc theo danh mục",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="instructor_id",
     *         in="query",
     *         description="Lọc theo giảng viên",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách khoá học"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Course::with(['category', 'instructor.user'])->withCount('enrollments')
            ->when($request->search, function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%');
            })
            ->when($request->category_id, function ($q) use ($request) {
                $q->where('category_id', $request->category_id);
            })
            ->when($request->instructor_id, function ($q) use ($request) {
                $q->where('instructor_id', $request->instructor_id);
            });

        $courses = $query->get();

        return Response::data(CourseResource::collection($courses), $courses->count());
    }

    /**
     * @OA\Post(
     *     path="/api/courses",
     *     summary="Tạo khoá học mới",
     *     tags={"Course"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title", "description", "price", "category_id", "instructor_id"},
     *             @OA\Property(property="title", type="string", example="Laravel cơ bản"),
     *             @OA\Property(property="description", type="string", example="Khóa học Laravel từ A-Z"),
     *             @OA\Property(property="price", type="number", format="float", example=199000),
     *             @OA\Property(property="category_id", type="integer", example=1),
     *             @OA\Property(property="instructor_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Khoá học được tạo thành công")
     * )
     */
    public function store(CreateCourseRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            // Lưu ảnh vào storage/app/public/thumbnails
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $data['thumbnail'] = $path;
        }

        $course = Course::create($data);
        return Response::data();
    }

    /**
     * @OA\Get(
     *     path="/api/courses/{id}",
     *     summary="Xem chi tiết khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Thông tin khoá học")
     * )
     */
    public function show($id)
    {
        $course = Course::with(['category', 'instructor.user'])->findOrFail($id);
        return Response::data(new CourseResource($course));
    }

    /**
     * @OA\Put(
     *     path="/api/courses/{id}",
     *     summary="Cập nhật khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         content={
     *             @OA\MediaType(
     *                 mediaType="multipart/form-data",
     *                 @OA\Schema(
     *                     required={"title", "description", "price", "category_id"},
     *                     @OA\Property(property="title", type="string", example="Laravel nâng cao"),
     *                     @OA\Property(property="description", type="string", example="Chuyên sâu về Laravel"),
     *                     @OA\Property(property="price", type="number", format="float", example=299000),
     *                     @OA\Property(property="category_id", type="integer", example=1),
     *                     @OA\Property(property="thumbnail", type="string", format="binary")
     *                 )
     *             )
     *         }
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Cập nhật khoá học thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="data", type="object")
     *         )
     *     ),
     *     @OA\Response(response=404, description="Không tìm thấy khoá học")
     * )
     */
    public function update(UpdateCourseRequest $request, $id)
    {
        $course = Course::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('thumbnail')) {
            // Xóa ảnh cũ nếu cần
            if ($course->thumbnail && \Storage::disk('public')->exists($course->thumbnail)) {
                \Storage::disk('public')->delete($course->thumbnail);
            }

            // Lưu ảnh mới
            $path = $request->file('thumbnail')->store('thumbnails', 'public');
            $data['thumbnail'] = $path;
            logger()->info('Thumbnail updated: ' . $path);
        }

        $course->update($data);

        return Response::data($request->hasFile('thumbnail'));
    }

    /**
     * @OA\Delete(
     *     path="/api/courses/{id}",
     *     summary="Xóa khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Xoá khoá học thành công")
     * )
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return Response::data();
    }

    /**
     * @OA\Get(
     *     path="/api/courses/my/enrolled",
     *     summary="Lấy danh sách khoá học đã đăng ký của người dùng",
     *     tags={"Course"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Tìm theo tiêu đề",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="Lọc theo danh mục",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="instructor_id",
     *         in="query",
     *         description="Lọc theo giảng viên",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách khoá học đã đăng ký")
     * )
     */
    public function getMyCourses(Request $request)
    {
        $user = $request->user();

        $enrollments = $user->enrollments()
            ->with(['course.category', 'course.instructor.user'])
            ->whereHas('course', function ($q) use ($request) {
                if ($request->search) {
                    $q->where('title', 'like', '%' . $request->search . '%');
                }
                if ($request->category_id) {
                    $q->where('category_id', $request->category_id);
                }
                if ($request->instructor_id) {
                    $q->where('instructor_id', $request->instructor_id);
                }
            })
            ->get();

        $courses = $enrollments->pluck('course');

        return Response::data($courses, $courses->count());
    }

    /**
     * @OA\Post(
     *     path="/api/courses/{id}/publish",
     *     summary="Publish khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Khoá học đã được publish")
     * )
     */
    public function publish($id)
    {
        $course = Course::findOrFail($id);
        $course->status = 'published';
        $course->save();
        return Response::data(['message' => 'Published']);
    }

    /**
     * @OA\Post(
     *     path="/api/courses/{id}/archive",
     *     summary="Archive khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Khoá học đã được archive")
     * )
     */
    public function archive($id)
    {
        $course = Course::findOrFail($id);
        $course->status = 'archived';
        $course->save();
        return Response::data(['message' => 'Archived']);
    }

    /**
     * @OA\Post(
     *     path="/api/courses/{id}/pending",
     *     summary="pending khoá học",
     *     tags={"Course"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID khoá học",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Khoá học đã được pending")
     * )
     */
    public function pending($id)
    {
        $course = Course::findOrFail($id);
        $course->status = 'pending';
        $course->save();
        return Response::data(['message' => 'pending']);
    }
}
