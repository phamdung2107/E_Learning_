<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnswerResource;
use App\Http\Requests\CreateAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Models\Answer;
use Illuminate\Http\Request;
use App\Helper\Response;

/**
 * @OA\Tag(
 *     name="Answers",
 *     description="Quản lý đáp án"
 * )
 */
class AnswerController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/answers",
     *     summary="Lấy danh sách tất cả đáp án",
     *     tags={"Answers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Danh sách đáp án")
     * )
     */
    public function index()
    {
        $answers = Answer::get();
        return Response::data(AnswerResource::collection($answers), $answers->count());
    }

    /**
     * @OA\Post(
     *     path="/api/answers",
     *     summary="Tạo đáp án mới",
     *     tags={"Answers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"question_id", "content", "is_correct"},
     *             @OA\Property(property="question_id", type="integer", example=1),
     *             @OA\Property(property="content", type="string", example="Đáp án A"),
     *             @OA\Property(property="is_correct", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Tạo đáp án thành công")
     * )
     */
    public function store(CreateAnswerRequest $request)
    {
        $answer = Answer::create($request->validated());
        return Response::data(new AnswerResource($answer));
    }

    /**
     * @OA\Get(
     *     path="/api/answers/{id}",
     *     summary="Lấy chi tiết đáp án",
     *     tags={"Answers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Chi tiết đáp án")
     * )
     */
    public function show($id)
    {
        $answer = Answer::findOrFail($id);
        return Response::data(new AnswerResource($answer));
    }

    /**
     * @OA\Put(
     *     path="/api/answers/{id}",
     *     summary="Cập nhật đáp án",
     *     tags={"Answers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="content", type="string", example="Đáp án đã cập nhật"),
     *             @OA\Property(property="is_correct", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(response=200, description="Cập nhật thành công")
     * )
     */
    public function update(UpdateAnswerRequest $request, $id)
    {
        $answer = Answer::findOrFail($id);
        $answer->update($request->validated());
        return Response::data(new AnswerResource($answer));
    }

    /**
     * @OA\Delete(
     *     path="/api/answers/{id}",
     *     summary="Xoá mềm đáp án",
     *     tags={"Answers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Xoá đáp án thành công")
     * )
     */
    public function destroy($id)
    {
        $answer = Answer::findOrFail($id);
        $answer->delete();
        return Response::data(['message' => 'Đáp án đã được xoá']);
    }

    /**
     * @OA\Get(
     *     path="/api/answers/question/{questionId}",
     *     summary="Lấy danh sách đáp án theo câu hỏi",
     *     tags={"Answers"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(name="questionId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách đáp án theo câu hỏi")
     * )
     */
    public function getByQuestion($questionId)
    {
        $answers = Answer::where('question_id', $questionId)->get();
        return Response::data(AnswerResource::collection($answers), $answers->count());
    }
}
