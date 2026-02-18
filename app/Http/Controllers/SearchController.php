<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use App\Models\Restaurante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $city = $request->input('city');
        $stars = $request->input('stars');

        // 1. Obtener Lugares
        $lugares = Lugar::query()
            ->when($search, fn($q, $s) => $q->where('nombre', 'like', "%{$s}%"))
            ->when($city, fn($q, $c) => $q->where('ciudad', $c))
            ->get()
            ->map(function ($lugar) {
                $promedio = DB::table('valoracion_lugares')
                    ->where('lugares_id', $lugar->id)
                    ->avg('puntuacion');
                
                $lugar->tipo = 'Lugar';
                // Enviamos 0.0 si es null para que React no falle
                $lugar->puntuacion_final = $promedio ? (float)$promedio : 0.0;
                return $lugar;
            });

        // 2. Obtener Restaurantes (Tabla con "s" confirmada)
        $restaurantes = Restaurante::query()
            ->when($search, fn($q, $s) => $q->where('nombre', 'like', "%{$s}%"))
            ->when($city, fn($q, $c) => $q->where('ciudad', $c))
            ->get()
            ->map(function ($rest) {
                $promedio = DB::table('valoracion_restaurantes')
                    ->where('restaurante_id', $rest->id)
                    ->avg('puntuacion');

                $rest->tipo = 'Restaurante';
                $rest->puntuacion_final = $promedio ? (float)$promedio : 0.0;
                return $rest;
            });

        $resultados = $lugares->concat($restaurantes);

        // 3. Filtrar por estrellas
        if ($stars) {
            $resultados = $resultados->filter(function ($item) use ($stars) {
                $min = (float)$stars;
                $max = $min + 0.99;
                return $item->puntuacion_final >= $min && $item->puntuacion_final <= $max;
            })->values();
        }

        return Inertia::render('Explorar', [
            'resultados' => $resultados,
            'filtros' => $request->only(['search', 'city', 'stars'])
        ]);
    }
}