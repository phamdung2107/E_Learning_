<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerResource;
use App\Http\Requests\CreateAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Models\Answer;
use Illuminate\Http\Request;
use App\Helper\Response;

class AnswerController extends Controller
{
    // [1] Danh sách tất cả đáp án
    public function index()
    {
        $answers = Answer::get();
        return Response::data(AnswerResource::collection($answers), $answers->count());
    }

    // [2] Tạo đáp án mới
    public function store(CreateAnswerRequest $request)
    {
        $answer = Answer::create($request->validated());
        return Response::data(new AnswerResource($answer));
    }

    // [3] Xem chi tiết đáp án
    public function show($id)
    {
        $answer = Answer::findOrFail($id);
        return Response::data(new AnswerResource($answer));
    }

    // [4] Cập nhật đáp án
    public function update(UpdateAnswerRequest $request, $id)
    {
        $answer = Answer::findOrFail($id);
        $answer->update($request->validated());
        return Response::data(new AnswerResource($answer));
    }

    // [5] Xoá mềm đáp án
    public function destroy($id)
    {
        $answer = Answer::findOrFail($id);
        $answer->delete();
        return Response::data(['message' => 'Đáp án đã được xoá']);
    }

    // [6] Lấy danh sách đáp án theo câu hỏi
    public function getByQuestion($questionId)
    {
        $answers = Answer::where('question_id', $questionId)->get();
        return Response::data(AnswerResource::collection($answers), $answers->count());
    }
}
