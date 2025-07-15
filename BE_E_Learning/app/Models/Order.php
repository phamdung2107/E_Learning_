<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Order extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'orders';

    protected $fillable = ['user_id','course_id', 'original_price', 'payment_status','payment_method'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
