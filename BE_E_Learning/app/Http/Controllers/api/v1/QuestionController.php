<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Http\Requests\CreateQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Helper\Response;

class QuestionController extends Controller
{
    // [1] Danh sách tất cả câu hỏi
    public function index()
    {
        $questions = Question::get();
        return Response::data(QuestionResource::collection($questions), $questions->count());
    }

    // [2] Tạo câu hỏi mới
    public function store(CreateQuestionRequest $request)
    {
        $question = Question::create($request->validated());
        return Response::data(new QuestionResource($question));
    }

    // [3] Chi tiết câu hỏi
    public function show($id)
    {
        $question = Question::findOrFail($id);
        return Response::data(new QuestionResource($question));
    }

    // [4] Cập nhật câu hỏi
    public function update(UpdateQuestionRequest $request, $id)
    {
        $question = Question::findOrFail($id);
        $question->update($request->validated());
        return Response::data(new QuestionResource($question));
    }

    // [5] Xoá mềm câu hỏi
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        return Response::data(['message' => 'Câu hỏi đã được xoá']);
    }

    // [6] Lấy danh sách câu hỏi theo quiz
    public function getByQuiz($quizId)
    {
        $questions = Question::where('quiz_id', $quizId)->orderBy('order_number')->get();
        return Response::data(QuestionResource::collection($questions), $questions->count());
    }
}
