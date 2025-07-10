<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'content' => 'nullable|string',
            'bonus_percent' => 'required|numeric|min:0|max:100',
            'start_time' => 'required|date|before:end_time',
            'end_time' => 'required|date|after:start_time',
        ];
    }
}
