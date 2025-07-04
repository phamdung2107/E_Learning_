<?php

namespace App\Http\Requests;

class CreateUserRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            "phone" => ["nullable", "string", "min:9", "max:11", "regex:/((849|843|847|848|845|09|02|03|07|08|05)+([0-9]{8,9})\b)/"],
            'gender' => 'nullable|in:male,female,other',
            "password" => "required|string",
            "roles" => "nullable|array|max:10",
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
            'phone.min' => 'Số điện thoại không nhỏ hơn 10 số',
            'phone.max' => 'số điện thoại không lớn hơn 11 số',
        ];
    }

    protected function prepareForValidation(): void
    {
        $roles = $this->roleId ? [$this->roleId] : $this->roles;
        $this->merge([
            'roles' => $roles,
        ]);
    }
}
