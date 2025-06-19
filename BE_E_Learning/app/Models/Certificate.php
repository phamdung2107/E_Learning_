<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Certificate extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'certificates';

    protected $fillable = ['user_id', 'course_id', 'issue_date', 'certificate_url'];

    public function user() { return $this->belongsTo(User::class); }
    public function course() { return $this->belongsTo(Course::class); }
}
