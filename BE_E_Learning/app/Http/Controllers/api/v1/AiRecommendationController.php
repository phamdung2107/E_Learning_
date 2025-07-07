<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\AiRecommendation;
use App\Helper\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class AiRecommendationController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/ai-recommendation",
     *     summary="Gửi title đến AI server và nhận lại reason. Nếu user đăng nhập thì lưu vào DB.",
     *     tags={"AI Recommendation"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title"},
     *             @OA\Property(property="title", type="string", example="Tôi muốn học lập trình Python")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Kết quả recommendation",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="reason", type="string")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Lỗi từ AI server hoặc lỗi kết nối"
     *     ),
     *     security={{"sanctum":{}}}
     * )
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $title = $data['title'];
        $user = $request->user(); // Có thể là null nếu không đăng nhập

        try {
            // Gửi title sang FastAPI server
            $response = Http::post('http://127.0.0.1:8000/api/recommend', [
                'title' => $title
            ]);

            if (!$response->successful()) {
                return Response::data(['message' => 'Không thể lấy dữ liệu từ AI server'], 500);
            }

            $reason = $response->json('reason');

            // Nếu có user (đăng nhập) thì lưu vào DB
            if ($user) {
                $recommendation = AiRecommendation::create([
                    'user_id' => $user->id,
                    'title' => $title,
                    'reason' => $reason,
                ]);

                return Response::data($recommendation);
            }

            // Nếu chưa đăng nhập thì chỉ trả về kết quả
            return Response::data([
                'title' => $title,
                'reason' => $reason,
            ]);

        } catch (\Exception $e) {
            return Response::data([
                'message' => 'Lỗi kết nối đến AI server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Get(
     *     path="/api/v1/ai-recommendation",
     *     summary="Lấy danh sách recommendation đã lưu của user đăng nhập",
     *     tags={"AI Recommendation"},
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách recommendation",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="title", type="string"),
     *                 @OA\Property(property="reason", type="string"),
     *                 @OA\Property(property="created_at", type="string", format="date-time")
     *             )),
     *             @OA\Property(property="count", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     security={{"sanctum":{}}}
     * )
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $recommendations = AiRecommendation::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return Response::data($recommendations, $recommendations->count());
    }
}
