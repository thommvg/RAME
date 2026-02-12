<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class lugar extends Model
{
    protected $table = 'lugares'; // coincide con tu tabla

    protected $fillable = [
        'nombre',
        'descripcion',
        'direccion',
        'tipo_de_turismo_id',
        'ciudad',
        'imagen'
    ];

    // Relación con valoraciones
    public function valoraciones()
    {
        // Asegúrate que la FK en valoraciones es 'turismo_id'
        return $this->hasMany(ValoracionLugar::class, ' lugares_id');
    }

    // Relación con ciudad
    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class);
    }
}
