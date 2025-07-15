<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'course' => new CourseResource($this->whenLoaded('course')),
            'user' => new UserResource($this->whenLoaded('user')),
            'original_price' => $this->price,
            'payment_status' => $this->status,
            'payment_method' => $this->payment_method,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}