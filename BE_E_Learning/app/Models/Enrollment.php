<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Enrollment extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'enrollments';

    protected $fillable = ['user_id', 'course_id', 'status'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
}

