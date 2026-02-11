<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurante extends Model
{
    protected $table = 'restaurantes';

    protected $fillable = [
        'nombre',
        'descripcion',
        'imagen',
        'direccion',
        'ciudad_id'
    ];

    public function valoraciones()
    {
        return $this->hasMany(ValoracionRestaurante::class);
    }
}
