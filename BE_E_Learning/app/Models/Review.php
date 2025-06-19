<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Review extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'reviews';

    protected $fillable = ['user_id', 'course_id', 'rating', 'comment'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
