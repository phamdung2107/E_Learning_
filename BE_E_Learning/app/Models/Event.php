<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Event extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'events';

    protected $fillable = ['name', 'content', 'bonus_percent', 'start_time', 'end_time', 'status'];
}
