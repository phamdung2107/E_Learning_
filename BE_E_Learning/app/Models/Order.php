<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Order extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'orders';

    protected $fillable = ['user_id', 'total_amount', 'voucher_id', 'payment_status'];

    public function user() { return $this->belongsTo(User::class); }
    public function voucher() { return $this->belongsTo(Voucher::class); }
}
