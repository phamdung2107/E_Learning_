<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Answer extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'answers';

    protected $fillable = ['question_id', 'answer_text', 'is_correct'];

    public function question() { return $this->belongsTo(Question::class); }
}

