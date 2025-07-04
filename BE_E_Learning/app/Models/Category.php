<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\BooleanSoftDeletes;

class Category extends Model
{
    use BooleanSoftDeletes;

    protected $table = 'categories';

    protected $fillable = ['name', 'parent_id'];

    public function parent() { return $this->belongsTo(Category::class, 'parent_id'); }
    public function children() { return $this->hasMany(Category::class, 'parent_id'); }
    public function courses() { return $this->hasMany(Course::class); }

    protected static function booted()
    {
        static::deleting(function ($category) {
            // Xoá mềm danh mục con
            $category->children()->update(['deleted' => true]);

            // Xoá mềm các khoá học thuộc danh mục
            $category->courses()->update(['deleted' => true]);
        });
    }
}

