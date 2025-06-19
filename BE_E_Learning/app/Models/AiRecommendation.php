<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class AiRecommendation extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'ai_recommendations';

    protected $fillable = ['user_id', 'course_id', 'reason'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
