<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultQuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quiz_id' => $this->quiz_id,
            'user_id' => $this->user_id,
            'total_questions' => $this->total_questions,
            'correct_answers' => $this->correct_answers,
            'is_pass' => $this->is_pass,
            'created_at' => $this->created_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'quiz' => new QuizzResource($this->whenLoaded('quiz')),
            'answers' => ResultAnswerResource::collection($this->whenLoaded('answers')),
        ];
    }
}
