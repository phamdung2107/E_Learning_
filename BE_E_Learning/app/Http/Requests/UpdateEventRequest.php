<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'content' => 'nullable|string',
            'bonus_percent' => 'sometimes|required|numeric|min:0|max:100',
            'start_time' => 'sometimes|required|date|before:end_time',
            'end_time' => 'sometimes|required|date|after:start_time',
            'status' => 'required|boolean',
        ];
    }
}
