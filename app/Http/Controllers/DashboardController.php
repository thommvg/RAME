<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Lugar;
use App\Models\Restaurante;
use App\Models\ValoracionLugar;
use App\Models\ValoracionRestaurante; 
use App\Models\Contacto; // Importante añadir esto

class DashboardController extends Controller
{
    public function index()
    {
        $lugares = Lugar::withAvg('valoraciones', 'puntuacion')
            ->where('tipo_de_turismo_id', '!=', 1)
            ->orderByDesc('valoraciones_avg_puntuacion')
            ->take(3)
            ->get();

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
        // 1. Definimos las reglas
        $rules = [
            'nombre' => 'required|string|max:100',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:100',
            'comentario' => 'required|string|min:10',
            'puntuacion' => 'required|integer|min:1|max:5',
            'imagen' => 'required|string',
            'tipo_entidad' => 'required|in:lugar,restaurante',
        ];

        // 2. Definimos los mensajes en ESPAÑOL
        $messages = [
            'required' => 'Este campo es obligatorio.',
            'string'   => 'El valor ingresado no es válido.',
            'max'      => 'Es demasiado largo (máximo :max caracteres).',
            'min'      => 'Debe tener al menos :min caracteres.',
            'integer'  => 'Debe ser un número entero.',
            'in'       => 'El tipo seleccionado no es válido.',
        ];

        $request->validate($rules, $messages);

        if ($request->tipo_entidad === 'lugar') {
            $nuevo = Lugar::create([
                'nombre' => $request->nombre,
                'direccion' => $request->direccion,
                'ciudad' => $request->ciudad,
                'tipo_de_turismo_id' => $request->tipo_de_turismo_id ?? 1,
                'descripcion' => $request->comentario ?? 'Sin descripción',
                'imagen' => $request->imagen,
            ]);

            ValoracionLugar::create([
                'lugares_id' => $nuevo->id,
                'puntuacion' => $request->puntuacion ?? 5,
                'comentario' => $request->comentario,
            ]);
        } else {
            $nuevo = Restaurante::create([
                'nombre' => $request->nombre,
                'direccion' => $request->direccion,
                'ciudad' => $request->ciudad,
                'descripcion' => $request->comentario ?? 'Sin descripción',
                'imagen' => $request->imagen,
                'tipo_de_comida_id' => $request->tipo_de_comida_id ?? 1, 
            ]);

            ValoracionRestaurante::create([
                'restaurante_id' => $nuevo->id,
                'puntuacion' => $request->puntuacion ?? 5,
                'comentario' => $request->comentario,
            ]);
        }

        return redirect()->back()->with('success', '¡Registro creado!');
    }

    public function contactoStore(Request $request) 
    {
        // Mensajes personalizados para el contacto
        $data = $request->validate([
            'nombre'   => 'required|string|max:100',
            'telefono' => 'required|string',
            'correo'   => 'required|email',
            'mensaje'  => 'required|string',
        ], [
            'required' => 'Por favor, completa este campo.',
            'email'    => 'Introduce un correo electrónico válido.',
            'max'      => 'El nombre es muy largo.',
        ]);

        Contacto::create($data);

        return redirect()->back()->with('success', 'Mensaje enviado correctamente');
    }
}