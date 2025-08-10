<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Course extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'courses';

    protected $fillable = ['title', 'description', 'price', 'instructor_id', 'category_id', 'thumbnail', 'status'];

    public function instructor() { return $this->belongsTo(Instructor::class); }
    public function category() { return $this->belongsTo(Category::class); }
    public function lessons() { return $this->hasMany(Lesson::class); }
    public function enrollments() { return $this->hasMany(Enrollment::class); }
    public function reviews() { return $this->hasMany(Review::class); }
    public function certificates() { return $this->hasMany(Certificate::class); }
    public function progressTracking()
    {
        return $this->hasMany(ProgressTracking::class, 'lesson_id', 'id');
    }
}
