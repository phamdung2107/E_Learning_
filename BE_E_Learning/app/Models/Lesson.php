<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Lesson extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'lessons';

    protected $fillable = ['course_id', 'title', 'video_url', 'content', 'order_number'];

    public function course() { return $this->belongsTo(Course::class); }
    public function quizzes() { return $this->hasMany(Quiz::class); }
    public function progressTrackings() { return $this->hasMany(ProgressTracking::class); }
}
