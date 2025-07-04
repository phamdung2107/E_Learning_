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
            'instructor_id'=> $this->instructor_id,
            'category_id'  => $this->category_id,
            'thumbnail' => $this->thumbnail
        ];
    }
}
