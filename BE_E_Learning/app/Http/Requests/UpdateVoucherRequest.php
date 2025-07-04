<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVoucherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'discount_percent' => 'sometimes|required|numeric|min:1|max:100',
            'valid_from' => 'sometimes|required|date',
            'valid_until' => 'sometimes|required|date|after_or_equal:valid_from',
            'usage_limit' => 'sometimes|required|integer|min:1',
        ];
    }
}
