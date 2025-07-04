<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use App\BooleanSoftDeletes;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable,HasFactory,BooleanSoftDeletes;
    // use SoftDeletes;

    protected $table = 'users';

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'phone',
        'gender',
        'date_of_birth',
        'role',
        'avatar',
        'status',
        'money'
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'money' => 'decimal:2',
        'deleted' => 'boolean',
    ];


    public function instructor() { return $this->hasOne(Instructor::class); }
    public function enrollments() { return $this->hasMany(Enrollment::class); }
    public function payments() { return $this->hasMany(Payment::class); }
    public function reviews() { return $this->hasMany(Review::class); }
    public function progressTrackings() { return $this->hasMany(ProgressTracking::class); }
    public function certificates() { return $this->hasMany(Certificate::class); }
    public function orders() { return $this->hasMany(Order::class); }
    public function aiRecommendations() { return $this->hasMany(AiRecommendation::class); }
    public function notifications(){return $this->hasMany(Notification::class);}

    public function getJWTIdentifier()
    {
        return $this->getKey(); // trả về ID mặc định
    }

    /**
     * Các claims bổ sung bạn muốn nhét vào JWT
     */
    public function getJWTCustomClaims()
    {
        return []; // nếu không có gì đặc biệt, cứ return mảng rỗng
    }
}

