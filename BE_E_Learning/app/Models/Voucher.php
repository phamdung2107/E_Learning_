<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Voucher extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'vouchers';

    protected $fillable = ['code', 'discount_percent', 'valid_from', 'valid_until', 'usage_limit', 'used_count'];

    public function orders() { return $this->hasMany(Order::class); }
}
