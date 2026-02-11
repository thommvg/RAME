<?php

namespace App\Models; // 1. El namespace SIEMPRE va primero

use Illuminate\Database\Eloquent\Model;
// Importa los otros modelos que usas en las relaciones
use App\Models\ValoracionLugar;
use App\Models\Ciudad;

// 2. Cambia 'lugares' por 'Lugar' (Singular y PascalCase)
class Lugar extends Model 
{
    protected $table = 'lugares'; 

    protected $fillable = [
        'nombre',
        'descripcion',
        'direccion',
        'tipo_de_turismo_id',
        'ciudad_id',
        'imagen'
    ];

    // Relación con valoraciones
    public function valoraciones()
    {
        // 3. Quita el espacio en ' lugares_id' para que sea 'lugares_id'
        return $this->hasMany(ValoracionLugar::class, 'lugares_id');
    }

    // Relación con ciudad
    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class);
    }
}