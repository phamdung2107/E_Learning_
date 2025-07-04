<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'type' => $this->type, // topup | withdraw
            'amount' => $this->amount,
            'status' => $this->status, 
            'transaction_id' => $this->transaction_id,
            'bank_account' => $this->bank_account,
            'created_at' => $this->created_at?->format('d/m/Y H:i'),
        ];
    }
}
