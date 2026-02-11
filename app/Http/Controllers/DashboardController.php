<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $lugares = Lugar::with('valoraciones')->where('tipo_de_turismo_id', '!=', 1)->get();

        $restaurantes = Lugar::with('valoraciones')->where('tipo_de_turismo_id', 1)->get();

        return Inertia::render('Dashboard', [
            'lugares' => $lugares,
            'restaurantes' => $restaurantes,
        ]);
    }
}
