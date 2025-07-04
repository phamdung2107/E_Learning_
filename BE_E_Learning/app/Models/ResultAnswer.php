<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class ResultAnswer extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'result_answers';

    protected $fillable = [
        'result_quiz_id',
        'question_id',
        'answer_id',
        'is_correct'
    ];

    public function resultQuiz()
    {
        return $this->belongsTo(ResultQuiz::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function answer()
    {
        return $this->belongsTo(Answer::class);
    }
}
