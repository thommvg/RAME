<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ValoracionLugar extends Model
{
    protected $table = 'valoracion_lugares';

    protected $fillable = [
        'restaurante_id',
        'user_id',
        'puntuacion',
        'comentario'
    ];

    public function turismo()
    {
        return $this->belongsTo(Turismo::class);
    }
}
