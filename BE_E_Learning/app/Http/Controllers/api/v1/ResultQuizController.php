<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ResultQuiz;
use App\Models\ResultAnswer;
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
            $resultQuiz = ResultQuiz::create([
                'user_id' => $user->id,
                'quiz_id' => $quizId,
                'total_questions' => $totalQuestions,
                'correct_answers' => 0,
                'is_pass' => false
            ]);

            foreach ($submittedAnswers as $item) {
                $isCorrect = Answer::where('id', $item['answer_id'])
                    ->where('question_id', $item['question_id'])
                    ->value('is_correct');

                ResultAnswer::create([
                    'result_quiz_id' => $resultQuiz->id,
                    'question_id' => $item['question_id'],
                    'selected_answer_id' => $item['answer_id'],
                    'is_correct' => $isCorrect,
                ]);

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
}
