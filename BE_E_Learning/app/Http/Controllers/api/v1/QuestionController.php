<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;
use App\Http\Requests\CreateQuestionRequest;
use App\Http\Requests\UpdateQuestionRequest;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Helper\Response;

class QuestionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/questions",
     *     summary="Lấy danh sách tất cả câu hỏi",
     *     tags={"Question"},
     *     @OA\Response(response=200, description="Danh sách câu hỏi")
     * )
     */
    public function index()
    {
        $questions = Question::get();
        return Response::data(QuestionResource::collection($questions), $questions->count());
    }

    /**
     * @OA\Post(
     *     path="/api/questions",
     *     summary="Tạo câu hỏi mới",
     *     tags={"Question"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
 *             required={"quiz_id", "content", "order_number"},
 *             @OA\Property(property="quiz_id", type="integer", example=3),
 *             @OA\Property(property="content", type="string", example="HTML là viết tắt của từ gì?"),
 *             @OA\Property(property="order_number", type="integer", example=1)
 *         )
     *     ),
     *     @OA\Response(response=200, description="Câu hỏi đã tạo")
     * )
     */
    public function store(CreateQuestionRequest $request)
    {
        $question = Question::create($request->validated());
        return Response::data(new QuestionResource($question));
    }

    /**
     * @OA\Get(
     *     path="/api/questions/{id}",
     *     summary="Chi tiết câu hỏi",
     *     tags={"Question"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Chi tiết câu hỏi")
     * )
     */
    public function show($id)
    {
        $question = Question::findOrFail($id);
        return Response::data(new QuestionResource($question));
    }

    /**
     * @OA\Put(
     *     path="/api/questions/{id}",
     *     summary="Cập nhật câu hỏi",
     *     tags={"Question"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
 *             @OA\Property(property="content", type="string", example="Câu hỏi cập nhật"),
 *             @OA\Property(property="order_number", type="integer", example=2)
 *         )
     *     ),
     *     @OA\Response(response=200, description="Câu hỏi đã cập nhật")
     * )
     */
    public function update(UpdateQuestionRequest $request, $id)
    {
        $question = Question::findOrFail($id);
        $question->update($request->validated());
        return Response::data(new QuestionResource($question));
    }

    /**
     * @OA\Delete(
     *     path="/api/questions/{id}",
     *     summary="Xoá câu hỏi",
     *     tags={"Question"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Đã xoá câu hỏi")
     * )
     */
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        return Response::data(['message' => 'Câu hỏi đã được xoá']);
    }

    /**
     * @OA\Get(
     *     path="/api/questions/quiz/{quizId}",
     *     summary="Lấy danh sách câu hỏi theo quiz",
     *     tags={"Question"},
     *     @OA\Parameter(
     *         name="quizId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách câu hỏi theo quiz")
     * )
     */
    public function getByQuiz($quizId)
    {
        $questions = Question::with('answers')
            ->where('quiz_id', $quizId)
            ->orderBy('order_number')
            ->get();

        return Response::data(QuestionResource::collection($questions), $questions->count());
    }
}