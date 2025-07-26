<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuizzResource;
use App\Http\Requests\CreateQuizzRequest;
use App\Http\Requests\UpdateQuizzRequest;
use App\Helper\Response;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/quizzes",
     *     summary="Lấy danh sách tất cả quizzes",
     *     tags={"Quiz"},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="lesson_id",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách quizzes")
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/api/quizzes",
     *     summary="Tạo mới quiz",
     *     tags={"Quiz"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
 *             required={"title", "lesson_id"},
 *             @OA\Property(property="title", type="string", example="Quiz chương 1"),
 *             @OA\Property(property="lesson_id", type="integer", example=7),
 *             @OA\Property(property="description", type="string", example="Bài kiểm tra kiến thức chương 1")
 *         )
     *     ),
     *     @OA\Response(response=200, description="Quiz đã tạo")
     * )
     */
    public function store(CreateQuizzRequest $request)
    {
        $quiz = Quiz::create($request->validated());
        return Response::data(new QuizzResource($quiz));
    }

    /**
     * @OA\Get(
     *     path="/api/quizzes/{id}",
     *     summary="Chi tiết quiz",
     *     tags={"Quiz"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Chi tiết quiz")
     * )
     */
    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);
        return Response::data(new QuizzResource($quiz));
    }

    /**
     * @OA\Put(
     *     path="/api/quizzes/{id}",
     *     summary="Cập nhật quiz",
     *     tags={"Quiz"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
 *             @OA\Property(property="title", type="string", example="Quiz chương 1 - cập nhật"),
 *             @OA\Property(property="description", type="string", example="Nội dung mới của bài quiz")
 *         )
     *     ),
     *     @OA\Response(response=200, description="Quiz đã cập nhật")
     * )
     */
    public function update(UpdateQuizzRequest $request, $id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->update($request->validated());
        return Response::data(new QuizzResource($quiz));
    }

    /**
     * @OA\Delete(
     *     path="/api/quizzes/{id}",
     *     summary="Xoá quiz",
     *     tags={"Quiz"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Quiz đã xoá")
     * )
     */
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();
        return Response::data(['message' => 'Quiz deleted']);
    }

    /**
     * @OA\Get(
     *     path="/api/quizzes/lesson/{lessonId}",
     *     summary="Lấy quiz theo bài học",
     *     tags={"Quiz"},
     *     @OA\Parameter(
     *         name="lessonId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Danh sách quiz theo bài học")
     * )
     */
    public function getByLesson($lessonId)
    {
        $quizzes = Quiz::where('lesson_id', $lessonId)->get();
        return Response::data(QuizzResource::collection($quizzes), $quizzes->count());
    }
}
