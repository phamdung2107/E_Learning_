<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'title'        => $this->title,
            'description'  => $this->description,
            'price'        => $this->price,
            'status'       => $this->status,
            'instructor' => new InstructorResource($this->whenLoaded('instructor')),
            'category'  => new CategoryResource($this->whenLoaded('category')),
            'thumbnail' => $this->thumbnail
        ];
    }
}
