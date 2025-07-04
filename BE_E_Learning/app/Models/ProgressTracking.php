<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class ProgressTracking extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'progress_tracking';

    protected $fillable = ['user_id', 'course_id', 'lesson_id', 'is_completed'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
    public function lesson() { return $this->belongsTo(Lesson::class); }
}
