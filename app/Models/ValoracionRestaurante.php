<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ValoracionRestaurante extends Model
{
    protected $table = 'valoracion_restaurantes'; 

    protected $fillable = [
        'lugares_id', // FK a la tabla lugares
        'puntuacion',
        'comentario'
    ];

    public function lugar()
    {
        return $this->belongsTo(Lugar::class, 'lugares_id');
    }
}