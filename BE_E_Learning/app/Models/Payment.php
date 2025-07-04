<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Payment extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'payments';

    protected $fillable = ['user_id', 'amount', 'status', 'transaction_id'];

    public function user() { return $this->belongsTo(User::class); }
}
