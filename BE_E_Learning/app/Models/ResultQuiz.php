<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class ResultQuiz extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'result_quizzes';

    protected $fillable = [
        'user_id',
        'quiz_id',
        'total_questions',
        'correct_answers',
        'is_pass'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function answers()
    {
        return $this->hasMany(ResultAnswer::class);
    }
}
