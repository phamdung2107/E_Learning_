<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class User extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'users';

    protected $fillable = [
        'full_name', 'email', 'password', 'phone', 'status','role', 'avatar'
    ];

    protected $hidden = ['password'];

    public function instructor() { return $this->hasOne(Instructor::class); }
    public function enrollments() { return $this->hasMany(Enrollment::class); }
    public function payments() { return $this->hasMany(Payment::class); }
    public function reviews() { return $this->hasMany(Review::class); }
    public function progressTrackings() { return $this->hasMany(ProgressTracking::class); }
    public function certificates() { return $this->hasMany(Certificate::class); }
    public function orders() { return $this->hasMany(Order::class); }
    public function aiRecommendations() { return $this->hasMany(AiRecommendation::class); }
    public function notifications(){return $this->hasMany(Notification::class);}
}

