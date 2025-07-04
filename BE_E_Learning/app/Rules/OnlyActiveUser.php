<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\User;

class OnlyActiveUser implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
{

    $exists = User::where('id', $value)
        ->where('deleted', 0)
        ->exists();

    if (!$exists) {
        $fail("Người dùng không tồn tại hoặc đã bị xóa.");
    }
}
}
