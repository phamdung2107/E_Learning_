<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Quiz extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'quizzes';

    protected $fillable = ['lesson_id', 'title', 'description'];

    public function lesson() { return $this->belongsTo(Lesson::class); }
    public function questions() { return $this->hasMany(Question::class); }
    public function resultQuiz()
    {
        return $this->hasMany(\App\Models\ResultQuiz::class, 'quiz_id', 'id');
    }
    public function latestResultQuiz()
    {
        return $this->hasOne(ResultQuiz::class)->latestOfMany('submitted_at');
    }
}
