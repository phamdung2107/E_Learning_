<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuizzResource;
use App\Http\Requests\CreateQuizzRequest;
use App\Http\Requests\UpdateQuizzRequest;
use App\Helper\Response;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    // [1] Danh sách tất cả quizzes
    public function index(Request $request)
    {
        $query = Quiz::when($request->search, function ($q) use ($request) {
                $q->where(function ($sub) use ($request) {
                    $sub->where('title', 'like', '%' . $request->search . '%');
                });
            })
            ->when($request->lesson_id, function ($q) use ($request) {
                $q->where('lesson_id', $request->lesson_id);
            });

        $quizzes = $query->get();

        return Response::data(QuizResource::collection($quizzes), $quizzes->count());
    }


    // [2] Tạo mới quiz
    public function store(CreateQuizzRequest $request)
    {
        $quiz = Quiz::create($request->validated());
        return Response::data(new QuizzResource($quiz));
    }

    // [3] Xem chi tiết quiz
    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);
        return Response::data(new QuizzResource($quiz));
    }

    // [4] Cập nhật quiz
    public function update(UpdateQuizzRequest $request, $id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->update($request->validated());
        return Response::data(new QuizzResource($quiz));
    }

    // [5] Xoá mềm quiz
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();
        return Response::data(['message' => 'Quiz deleted']);
    }

    // [6] Lấy quiz theo bài học
    public function getByLesson($lessonId)
    {
        $quizzes = Quiz::where('lesson_id', $lessonId)->get();
        return Response::data(QuizzResource::collection($quizzes), $quizzes->count());
    }
}
