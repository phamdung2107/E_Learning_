<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VoucherResource extends JsonResource
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
            'code' => $this->code,
            'discount_percent' => $this->discount_percent,
            'valid_from' => $this->valid_from,
            'valid_until' => $this->valid_until,
            'usage_limit' => $this->usage_limit,
            'usage_count' => $this->usage_count,
        ];
    }
}
