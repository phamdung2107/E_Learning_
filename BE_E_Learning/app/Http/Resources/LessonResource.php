<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title'         => $this->title,
            'video_url'     => $this->video_url,
            'content'       => $this->content,
            'course_id'     => $this->course_id,
            'order_number'  => $this->order_number,
            'is_completed' => (bool) optional($this->progressForCurrentUser)->is_completed,
        ];
    }
}
