<?php

namespace App\Http\Requests;


class UpdateUserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->user ?? null;

        return [
            "full_name" => "nullable|string|max:50",
            "email" => "nullable|string|email:rfc,filter|unique:App\Models\User,email,{$id}",
            "phone" => ["nullable", "string", "min:9", "max:11", "regex:/((849|843|847|848|845|09|02|03|07|08|05)+([0-9]{8,9})\b)/"],
            "gender" => 'nullable',
            "date_of_birth" => "nullable|date_format:Y-m-d|before:now",
        ];
    }
    public function attributes(): array
    {
        return [
            'phone' => 'Số điện thoại',
        ];
    }
    public function messages(): array
    {
        return [
            'phone.regex' => 'Định dạng Số điện thoại không hợp lệ'
        ];
    }
}
