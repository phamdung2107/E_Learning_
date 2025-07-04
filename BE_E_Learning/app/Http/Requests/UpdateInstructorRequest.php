<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstructorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'bio' => 'nullable|string|max:1000',
            'experience_years' => 'nullable|integer|min:0|max:50',
            'linkedin_url' => 'nullable|url|max:255'
        ];
    }

    public function messages()
    {
        return [
            'linkedin_url.url' => 'Liên kết LinkedIn không hợp lệ.',
            'experience_years.integer' => 'Số năm kinh nghiệm phải là số nguyên.',
            'experience_years.min' => 'Số năm kinh nghiệm không hợp lệ.',
        ];
    }
}
