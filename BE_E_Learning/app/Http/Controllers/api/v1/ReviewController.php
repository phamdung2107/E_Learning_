<?php

namespace App\Http\Controllers\Api\v1;

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
    // [1] Danh sách đánh giá
    public function index(Request $request)
    {
        $query = Review::when($request->rating, function ($q) use ($request) {
                $q->where('rating', $request->rating);
            });

        $reviews = $query->get();

        return Response::data(ReviewResource::collection($reviews), $reviews->count());
    }

    // [2] Tạo đánh giá
    public function store(CreateReviewRequest $request)
    {
        $data = $request->validated();

        // Kiểm tra người dùng đã đánh giá khóa học chưa
        $exists = Review::where('user_id', $data['user_id'])
            ->where('course_id', $data['course_id'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Bạn đã đánh giá khóa học này rồi'], 422);
        }

        $review = Review::create($data);

        // Notification::create([
        //     'user_id' => $user->id,
        //     'type' => 'orther',
        //     'title' => 'Bạn có đánh giá mới',
        //     'message' => "Khóa học '{$course->title}' vừa nhận được đánh giá {$review->rating} sao."
        // ]);
        return Response::data(new ReviewResource($review));
    }

    // [3] Chi tiết đánh giá
    public function show($id)
    {
        $review = Review::findOrFail($id);
        return Response::data(new ReviewResource($review));
    }

    // [4] Cập nhật đánh giá
    public function update(UpdateReviewRequest $request, $id)
    {
        $review = Review::findOrFail($id);
        $review->update($request->validated());
        return Response::data(new ReviewResource($review));
    }

    // [5] Xóa mềm
    public function destroy($id)
    {
        $review = Review::findOrFail($id);
        $review->delete();
        return Response::data(['message' => 'Đã xoá đánh giá']);
    }

    // [6] Lấy đánh giá theo khóa học
    public function getByCourse($courseId)
    {
        $reviews = Review::where('course_id', $courseId)->get();
        return Response::data(ReviewResource::collection($reviews), $reviews->count());
    }

    // [7] Lấy đánh giá theo người dùng
    public function getByUser($userId)
    {
        $reviews = Review::where('user_id', $userId)->get();
        return Response::data(ReviewResource::collection($reviews), $reviews->count());
    }

    // [8] Trung bình đánh giá của 1 khóa học
    public function averageRating($courseId)
    {
        $avg = Review::where('course_id', $courseId)->avg('rating');
        return Response::data(['average_rating' => round($avg, 1)]);
    }
}
