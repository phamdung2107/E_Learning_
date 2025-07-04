<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateWithdrawRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'amount' => 'required|numeric|min:10000',
            'bank_account' => 'required|string|max:100',
            'note' => 'required|string|max:100'
        ];
    }

    public function messages()
    {
        return [
            'amount.required' => 'Số tiền không được để trống',
            'amount.numeric' => 'Số tiền phải là số',
            'amount.min' => 'Số tiền rút tối thiểu là 10.000 VNĐ',
            'bank_account.required' => 'Số tài khoản ngân hàng là bắt buộc',
            'note'=>'Tên ngân hàng là bắt buộc'
        ];
    }
}
