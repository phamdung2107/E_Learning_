<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ResultQuiz;
use App\Models\ResultAnswer;
use App\Models\Lesson;
use App\Http\Resources\ResultQuizResource;
use App\Models\Answer;
use App\Models\Question;
use App\Helper\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ResultQuizController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/result-quizzes/submit",
     *     summary="Nộp bài quiz",
     *     tags={"ResultQuiz"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="quiz_id", type="integer"),
     *             @OA\Property(
     *                 property="answers",
     *                 type="array",
     *                 @OA\Items(
     *                     @OA\Property(property="question_id", type="integer"),
     *                     @OA\Property(property="answer_id", type="integer")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=200, description="Nộp bài thành công")
     * )
     */
    public function submit(Request $request)
    {
        $data = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.answer_id' => 'required|exists:answers,id'
        ]);

        $user = Auth::user();
        $quizId = $data['quiz_id'];
        $submittedAnswers = $data['answers'];

        $totalQuestions = Question::where('quiz_id', $quizId)->count();
        $correctCount = 0;

        DB::beginTransaction();

        try {
            $resultQuiz = ResultQuiz::updateOrCreate(
                ['user_id' => $user->id, 'quiz_id' => $quizId],
                [
                    'total_questions' => $totalQuestions,
                    'correct_answers' => 0,
                    'is_pass' => false
                ]
            );

            foreach ($submittedAnswers as $item) {
                $isCorrect = Answer::where('id', $item['answer_id'])
                    ->where('question_id', $item['question_id'])
                    ->value('is_correct');

                ResultAnswer::updateOrCreate(
                    [
                        'result_quiz_id' => $resultQuiz->id,
                        'question_id' => $item['question_id']
                    ],
                    [
                        'selected_answer_id' => $item['answer_id'],
                        'is_correct' => $isCorrect
                    ]
                );

                if ($isCorrect) {
                    $correctCount++;
                }
            }

            $score = round(($correctCount / $totalQuestions) * 100, 2);
            $isPass = $score >= 50;

            $resultQuiz->update([
                'correct_answers' => $correctCount,
                'is_pass' => $isPass
            ]);

            DB::commit();

            return Response::data();
        } catch (\Exception $e) {
            DB::rollBack();
            return Response::data(['message' => $e], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/result-quizzes/my/{quizId}",
     *     summary="Lấy kết quả quiz của người dùng hiện tại",
     *     tags={"ResultQuiz"},
     *     @OA\Parameter(name="quizId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách kết quả của người dùng")
     * )
     */
    public function getMyByQuiz($quizId)
    {
        $userId = Auth::id();
        $results = ResultQuiz::where('quiz_id', $quizId)
            ->where('user_id', $userId)
            ->get();
        return Response::data($results, $results->count());
    }

    /**
     * @OA\Get(
     *     path="/api/result-quizzes/quiz/{quizId}",
     *     summary="Lấy tất cả kết quả quiz",
     *     tags={"ResultQuiz"},
     *     @OA\Parameter(name="quizId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách kết quả của tất cả người dùng")
     * )
     */
    public function getByQuiz($quizId)
    {
        $results = ResultQuiz::where('quiz_id', $quizId)->get();
        return Response::data($results, $results->count());
    }


    /**
     * @OA\Get(
     *     path="/api/result-quizzes/by-lesson/{lessonId}",
     *     summary="Lấy danh sách kết quả quiz của user hiện tại theo lesson",
     *     tags={"ResultQuiz"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="lessonId",
     *         in="path",
     *         required=true,
     *         description="ID của lesson",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách kết quả quiz của user hiện tại trong lesson",
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Lesson not found"
     *     )
     * )
     */
    public function getMyResultByLesson($lessonId)
    {
        $userId = Auth::id();
        $lesson = Lesson::with('quizzes')->findOrFail($lessonId);
        $quizIds = $lesson->quizzes->pluck('id');
        $results = ResultQuiz::whereIn('quiz_id', $quizIds)
            ->where('user_id', $userId)
            ->get()
            ->keyBy('quiz_id');

        $data = [];
        foreach ($quizIds as $quizId) {
            if ($results->has($quizId)) {
                $result = $results->get($quizId);
                $data[] = [
                    'quiz_id' => $quizId,
                    'is_pass' => $result->is_pass,
                    'user_id' => $userId,
                ];
            } else {
                $data[] = [
                    'quiz_id' => $quizId,
                    'is_pass' => 0,
                    'user_id' => $userId,
                ];
            }
        }

        return Response::data($data, count($data));
    }


    /**
     * @OA\Get(
     *     path="/api/result-quizzes/user/{userId}",
     *     summary="Lấy tất cả kết quả của người dùng",
     *     tags={"ResultQuiz"},
     *     @OA\Parameter(name="userId", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Danh sách kết quả của người dùng")
     * )
     */
    public function getByUser($userId)
    {
        $results = ResultQuiz::where('user_id', $userId)->get();
        return Response::data($results, $results->count());
    }
}