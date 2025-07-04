<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Question extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'questions';

    protected $fillable = ['quiz_id', 'question_text', 'question_type' , 'order_number'];

    public function quiz() { return $this->belongsTo(Quiz::class); }
    public function answers() { return $this->hasMany(Answer::class); }
}
