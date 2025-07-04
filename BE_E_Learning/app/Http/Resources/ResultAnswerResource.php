<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultAnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'result_quiz_id' => $this->result_quiz_id,
            'question_id' => $this->question_id,
            'answer_id' => $this->answer_id,
            'is_correct' => $this->is_correct,
            'question' => new QuestionResource($this->whenLoaded('question')),
            'answer' => new AnswerResource($this->whenLoaded('answer')),
        ];
    }
}
