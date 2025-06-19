<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Payment extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'payments';

    protected $fillable = ['user_id', 'amount', 'payment_method', 'status', 'transaction_id', 'paid_at'];

    public function user() { return $this->belongsTo(User::class); }
}
