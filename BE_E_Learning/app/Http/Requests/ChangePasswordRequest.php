<?php

namespace App\Http\Requests;

class ChangePasswordRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            "oldPassword" => "required|string|min:6|max:15",
            "newPassword" => "required|string|min:6|max:15",
            "confirmPassword" => "required|string|min:6|max:15|same:newPassword",
        ];
    }
    public function messages(): array
    {
        return [
            'oldPassword.min' => "Mật khẩu cũ không đúng",
            'oldPassword.max' => "Mật khẩu cũ không đúng",
            'confirmPassword.same' => "Mật khẩu mới phải khác mật khẩu cũ",
        ];
    }
}
