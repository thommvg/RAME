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

    // --- AÑADE ESTA LÍNEA ---
    // Esto evita el error de las columnas de tiempo que no existen en tu tabla
    public $timestamps = false; 

    public function valoraciones()
    {
        // Asegúrate de que el nombre de la clase sea exacto
        return $this->hasMany(ValoracionRestaurante::class, 'restaurante_id');
    }
}