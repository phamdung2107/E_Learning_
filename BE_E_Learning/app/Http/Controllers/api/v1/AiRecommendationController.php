<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\AiRecommendation;
use App\Helper\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class AiRecommendationController extends Controller
{
    // [1] Gửi recommendation mới từ client (lưu title + reason cho user)

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $user = $request->user();
        $title = $data['title'];

        // Gửi title sang FastAPI server
        try {
            $response = Http::post('http://127.0.0.1:8000/api/recommend', [  
                'title' => $title
            ]);

            if ($response->successful()) {
                $reason = $response->json('reason'); // FastAPI trả về { "reason": "..." }
            } else {
                return Response::data(['message' => 'Không thể lấy dữ liệu từ AI server'], 500);
            }
        } catch (\Exception $e) {
            return Response::data(['message' => 'Lỗi kết nối đến AI server', 'error' => $e->getMessage()], 500);
        }

        // Lưu recommendation vào DB
        $recommendation = AiRecommendation::create([
            'user_id' => $user->id,
            'title' => $title,
            'reason' => $reason,
        ]);

        return Response::data($recommendation);
    }

    public function recommendOnly(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        try {
            // Gửi title sang FastAPI
            $response = Http::post('http://127.0.0.1:8000/api/recommend', [
                'title' => $data['title']
            ]);

            if ($response->successful()) {
                return Response::data([
                    'title' => $data['title'],
                    'reason' => $response->json('reason')
                ]);
            }

            return Response::data(['message' => 'Không thể lấy dữ liệu từ AI server'], 500);

        } catch (\Exception $e) {
            return Response::data([
                'message' => 'Lỗi kết nối đến AI server',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    // [2] Lấy danh sách gợi ý AI của user đang đăng nhập
    public function index(Request $request)
    {
        $user = $request->user();

        $recommendations = AiRecommendation::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return Response::data($recommendations, $recommendations->count());
    }
}
