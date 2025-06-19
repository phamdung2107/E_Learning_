<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Instructor extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'instructors';

    protected $fillable = ['user_id', 'bio', 'experience_years', 'linkedin_url'];

    public function user() { return $this->belongsTo(User::class); }
    public function courses() { return $this->hasMany(Course::class); }
}
