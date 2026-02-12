import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

// -------------------------------------------------------------
// 1. COMPONENTE HERO HEADER
// -------------------------------------------------------------
function HeroHeader() {
    return (
        <div className="relative bg-gray-900 overflow-hidden" id='Inicio'>
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                    backgroundImage: "url('https://www.medellincomovamos.org/wp-content/uploads/2025/09/2-El-desastre-no-es-natural.jpg')",
                    backgroundColor: '#1e0a35'
                }}
            ></div>
            <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32 flex items-center h-96">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-purple-200 sm:text-4xl">
                        Descubre hermosos lugares del valle de aburra
                    </h2>
                    <p className="mt-4 text-lg text-purple-300">
                        Encuentra las joyas escondidas y los restaurantes mejor valorados
                    </p>
                    <div className="mt-8">
                        <a href="#Lugares" className="inline-flex items-center justify-center px-5 py-3 rounded-md text-purple-900 bg-white hover:bg-gray-200 shadow-lg">
                            Explorar Lugares
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// -------------------------------------------------------------
// 2. COMPONENTE TARJETA (ACTUALIZADO)
// -------------------------------------------------------------
const PlaceCard = ({ name, rating, imageUrl }) => {
    // Redondeamos el promedio (ej: 4.5 a 5) para pintar las estrellas
    const numericRating = Math.round(rating || 0);

    const stars = Array(5).fill(0).map((_, index) => (
        <span
            key={index}
            className={`text-2xl ${index < numericRating ? 'text-purple-500' : 'text-gray-600'}`}
        >
            ★
        </span>
    ));

    return (
        <div className="flex flex-col items-center p-4">
            <div className="relative w-40 h-40">
                <img
                    src={imageUrl || "https://placehold.co/150x150"}
                    alt={name}
                    className="w-full h-full object-cover rounded-full shadow-lg border-4 border-purple-500 hover:scale-105 transition"
                />
            </div>
            <p className="mt-4 text-white text-center font-semibold uppercase text-sm">
                {name}
            </p>
            <div className="flex mt-2">
                {stars}
            </div>
        </div>
    );
};

// -------------------------------------------------------------
// 3. DASHBOARD PRINCIPAL
// -------------------------------------------------------------
export default function Dashboard({ auth, lugares, restaurantes }) {
    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Inicio" />
            <HeroHeader />

            {/* LUGARES */}
            <div className="bg-gray-900 py-12 border-t border-purple-800" id="Lugares">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-extrabold text-white text-center mb-10">
                        Lugares mejores puntuados
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {lugares && lugares.length > 0 ? (
                            lugares.map((place) => (
                                <PlaceCard
                                    key={place.id}
                                    name={place.nombre}
                                    // USAMOS EL PROMEDIO CALCULADO POR LARAVEL
                                    rating={place.valoraciones_avg_puntuacion}
                                    imageUrl={place.imagen}
                                />
                            ))
                        ) : (
                            <p className="text-white text-center col-span-3">No hay lugares registrados</p>
                        )}
                    </div>
                </div>
            </div>

            {/* RESTAURANTES */}
            <div className="bg-gray-900 py-20 border-t border-purple-800" id="Restaurantes">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-extrabold text-white text-center mb-10">
                        Restaurantes más buscados
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {restaurantes && restaurantes.length > 0 ? (
                            restaurantes.map((rest) => (
                                <PlaceCard
                                    key={rest.id}
                                    name={rest.nombre}
                                    // TAMBIÉN AQUÍ PARA RESTAURANTES
                                    rating={rest.valoraciones_avg_puntuacion}
                                    imageUrl={rest.imagen}
                                />
                            ))
                        ) : (
                            <p className="text-white text-center col-span-3">No hay restaurantes registrados</p>
                        )}
                    </div>
                </div>
            </div>

            {/* SECCIÓN DE CONTACTO SE MANTIENE IGUAL... */}
            <div className="bg-gray-900 py-16 border-t border-purple-800">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-extrabold text-white text-center mb-10">Contacto</h3>
                    <div className="p-10">
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <input type="text" placeholder="Nombre" className="w-full p-3 rounded bg-white text-black" />
                            <input type="text" placeholder="Teléfono" className="w-full p-3 rounded bg-white text-black" />
                            <input type="email" placeholder="Correo" className="w-full p-3 rounded bg-white text-black" />
                        </div>
                        <textarea placeholder="Mensaje" className="w-full p-3 rounded bg-white text-black mb-6"></textarea>
                        <div className="text-center">
                            <button className="px-6 py-2 bg-purple-800 text-white rounded hover:bg-purple-900">Enviar</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}