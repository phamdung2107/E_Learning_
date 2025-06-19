<?php

namespace App;
use Illuminate\Database\Eloquent\Builder;

trait BooleanSoftDeletes
{
    protected static function bootBooleanSoftDeletes()
    {
        static::addGlobalScope('deleted', function (Builder $builder) {
            $builder->where('deleted', false);
        });

        static::deleting(function ($model) {
            $model->deleted = true;
            $model->save();
        });
    }

    public function restore()
    {
        $this->deleted = false;
        $this->save();
    }
}
