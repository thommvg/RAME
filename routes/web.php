<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// AÑADIMOS LA RUTA 'ACERCA-DE' QUE TU NAVBAR ESTÁ BUSCANDO
Route::get('/lugares', function () {
    // Por ahora, solo renderizará el mismo Dashboard para evitar otro error.
    // Más tarde, cambiaremos 'Dashboard' por 'Lugares' o 'AcercaDe'.
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('acerca-de'); // 👈 El nombre DEBE ser 'acerca-de'

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/logout', function () {
    Auth::logout(); // Función de Laravel para cerrar la sesión
    request()->session()->invalidate(); // Invalida la sesión actual
    request()->session()->regenerateToken(); // Regenera el token CSRF

    return redirect('/Welcome'); // Redirige al inicio (o donde desees)
})->middleware('auth')->name('logout');
require __DIR__.'/auth.php';
