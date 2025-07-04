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
            // Chỉ đánh dấu là deleted nếu chưa bị xóa
            if (!$model->deleted) {
                $model->deleted = true;
                $model->save();

                // Ngăn Laravel thực hiện xóa thật (nếu gọi delete() trong Repository hoặc Eloquent)
                return false;
            }
        });
    }

    public function restore()
    {
        $this->deleted = false;
        $this->save();
    }
}
