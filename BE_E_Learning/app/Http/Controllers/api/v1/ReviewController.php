<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Course;
use App\Http\Requests\CreateReviewRequest;
use App\Http\Requests\UpdateReviewRequest;
use App\Http\Resources\ReviewResource;
use Illuminate\Http\Request;
use App\Helper\Response;
use App\Models\Notification;

class ReviewController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/reviews",
     *     summary="Danh sách đánh giá",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="rating",
     *         in="query",
     *         description="Lọc theo sao đánh giá",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách đánh giá")
     * )
     */
    public function index(Request $request)
    {
        $query = Review::with(['user', 'course'])->when($request->rating, function ($q) use ($request) {
                $q->where('rating', $request->rating);
            });

        $reviews = $query->get();

        return Response::data(ReviewResource::collection($reviews), $reviews->count());
    }

    /**
     * @OA\Post(
     *     path="/api/reviews",
     *     summary="Tạo đánh giá",
     *     tags={"Review"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
 *             required={"user_id", "course_id", "rating", "comment"},
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="course_id", type="integer", example=3),
 *             @OA\Property(property="rating", type="number", format="float", example=4.5),
 *             @OA\Property(property="comment", type="string", example="Khóa học rất hữu ích!")
 *         )
     *     ),
     *     @OA\Response(response=200, description="Đánh giá đã tạo")
     * )
     */
    public function store(CreateReviewRequest $request)
    {
        $data = $request->validated();

        $exists = Review::where('user_id', $data['user_id'])
            ->where('course_id', $data['course_id'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Bạn đã đánh giá khóa học này rồi'], 422);
        }

        $review = Review::create($data);

        $course = Course::find($data['course_id']);
        
        $instructorUserId = \DB::table('instructors')
            ->where('id', $course->instructor_id)
            ->value('user_id');

        Notification::create([
            'user_id' => $instructorUserId,
            'type' => 'other',
            'title' => 'Bạn có đánh giá mới',
            'message' => "Khóa học '{$course->title}' vừa nhận được đánh giá {$review->rating} sao."
        ]);

        return Response::data(new ReviewResource($review));
    }

    /**
     * @OA\Get(
     *     path="/api/reviews/{id}",
     *     summary="Chi tiết đánh giá",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Chi tiết đánh giá")
     * )
     */
    public function show($id)
    {
        $review = Review::with(['user', 'course'])->findOrFail($id);
        return Response::data(new ReviewResource($review));
    }

    /**
     * @OA\Put(
     *     path="/api/reviews/{id}",
     *     summary="Cập nhật đánh giá",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
 *             @OA\Property(property="rating", type="number", format="float", example=4.0),
 *             @OA\Property(property="comment", type="string", example="Cập nhật nhận xét")
 *         )
     *     ),
     *     @OA\Response(response=200, description="Đã cập nhật đánh giá")
     * )
     */
    public function update(UpdateReviewRequest $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->update($request->validated());
        return Response::data(new ReviewResource($review));
    }

    /**
     * @OA\Delete(
     *     path="/api/reviews/{id}",
     *     summary="Xoá đánh giá",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Đã xoá đánh giá")
     * )
     */
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return Response::data(['message' => 'Đã xoá đánh giá']);
    }

    /**
     * @OA\Get(
     *     path="/api/reviews/course/{courseId}",
     *     summary="Lấy đánh giá theo khóa học",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách đánh giá của khoá học")
     * )
     */
    public function getByCourse($courseId)
    {
        $reviews = Review::with(['user', 'course'])->where('course_id', $courseId)->get();
        return Response::data(ReviewResource::collection($reviews), $reviews->count());
    }

    /**
     * @OA\Get(
     *     path="/api/reviews/user/{userId}",
     *     summary="Lấy đánh giá theo người dùng",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách đánh giá của người dùng")
     * )
     */
    public function getByUser($userId)
    {
        $reviews = Review::with(['user', 'course'])->where('user_id', $userId)->get();
        return Response::data(ReviewResource::collection($reviews), $reviews->count());
    }

    /**
     * @OA\Get(
     *     path="/api/reviews/average/{courseId}",
     *     summary="Trung bình đánh giá của 1 khoá học",
     *     tags={"Review"},
     *     @OA\Parameter(
     *         name="courseId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Trung bình số sao đánh giá")
     * )
     */
    public function averageRating($courseId)
    {
        $avg = Review::where('course_id', $courseId)->avg('rating');
        return Response::data(['average_rating' => round($avg, 1)]);
    }
}
