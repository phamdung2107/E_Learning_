<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class OrderItem extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'order_items';

    protected $fillable = ['order_id', 'course_id', 'price'];

    public function order() { return $this->belongsTo(Order::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
