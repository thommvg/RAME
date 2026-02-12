<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
// Importamos todos los modelos necesarios
use App\Models\Lugar;
use App\Models\Restaurante;
use App\Models\ValoracionLugar;
use App\Models\Valoracion_Restaurantes;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Top 3 Lugares
        $lugares = Lugar::withAvg('valoraciones', 'puntuacion')
            ->where('tipo_de_turismo_id', '!=', 1)
            ->orderByDesc('valoraciones_avg_puntuacion') // Laravel genera este nombre automáticamente
            ->take(3)
            ->get();

        // 2. Top 3 Restaurantes
        $restaurantes = Restaurante::withAvg('valoraciones', 'puntuacion')
            ->orderByDesc('valoraciones_avg_puntuacion')
            ->take(3)
            ->get();

        return Inertia::render('Dashboard', [
            'lugares' => $lugares,
            'restaurantes' => $restaurantes
        ]);
    }

    public function store(Request $request)
{
    // 1. Validamos que todo sea obligatorio para que Laravel nos avise ANTES del error rojo
    $request->validate([
        'nombre' => 'required',
        'direccion' => 'required',
        'ciudad_id' => 'required',
        'puntuacion' => 'required',
        'tipo_de_turismo_id' => 'required_if:tipo_entidad,lugar', // Solo obligatorio para lugares
    ]);

    if ($request->tipo_entidad === 'lugar') {
        $nuevo = Lugar::create([
            'nombre'             => $request->nombre,
            'direccion'          => $request->direccion,
            'ciudad_id'          => $request->ciudad_id,
            // 2. Si por alguna razón llega vacío, le asignamos uno por defecto (ej: 2 que es Naturaleza)
            'tipo_de_turismo_id' => $request->tipo_de_turismo_id ?? 2, 
            'descripcion'        => $request->comentario ?? 'Sin descripción',
        ]);

        ValoracionLugar::create([
            'lugares_id' => $nuevo->id,
            'puntuacion' => $request->puntuacion,
            'comentario' => $request->comentario,
        ]);
    } else {
        // Lógica para Restaurante...
        $nuevo = Restaurante::create([
            'nombre'      => $request->nombre,
            'direccion'   => $request->direccion,
            'ciudad_id'   => $request->ciudad_id,
            'descripcion' => $request->comentario ?? 'Sin descripción',
        ]);

        // Asegúrate de usar el nombre exacto de tu modelo (con o sin S)
        Valoracion_restaurante::create([
            'restaurante_id' => $nuevo->id,
            'puntuacion'     => $request->puntuacion,
            'comentario'     => $request->comentario,
        ]);
    }

    return redirect()->back();
}
}