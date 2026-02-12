<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Inertia\Inertia;

class DashboardController extends Controller
{
public function index()
{
    // Calculamos el promedio de la columna 'puntuacion' de la relación 'valoraciones'
    $lugares = Lugar::withAvg('valoraciones', 'puntuacion')
                    ->where('tipo_de_turismo_id', '!=', 1)
                    ->orderByDesc('valoraciones_avg_puntuacion')
                    ->take(3)
                    ->get();



    return Inertia::render('Dashboard', [
        'lugares' => $lugares,

    ]);
}
}
