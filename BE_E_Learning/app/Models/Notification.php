<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Notification extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'notifications';

    protected $fillable = ['user_id', 'title', 'message', 'type', 'is_read'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

