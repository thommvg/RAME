import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

// Datos de ejemplo para las tarjetas (Lugares mejores puntuados)
const topPlaces = [
    { 
        name: "Cerro de los Tres Cruces", 
        rating: 5, 
        imageUrl: "https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/uploads/2022/02/20201231-cerro-tres-cruces.jpg" 
    },
    { 
      
        name: "Charcos de Melcocho", 
        rating: 4, 
        imageUrl:"https://orienteantioqueno.com/wp-content/uploads/2020/07/rio-melcocho-cocorna-oriente-antioque%C3%B1o.jpg", 
    },
    { 
        name: "Loma del Asfixiadero", 
        rating: 5, 
        imageUrl: "https://s0.wklcdn.com/image_15/472831/101590464/66099543Master.jpg" 
    },
];

// -------------------------------------------------------------
// 1. COMPONENTE HERO HEADER
// -------------------------------------------------------------
function HeroHeader() {
    return (
        <div className="relative bg-gray-900 overflow-hidden" id='Inicio'>
            {/* Imagen de Fondo (Placeholder) */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-70"
                style={{
                    backgroundImage: "url('https://www.medellincomovamos.org/wp-content/uploads/2025/09/2-El-desastre-no-es-natural.jpg')",
                    backgroundColor: '#1e0a35'
                }}
            ></div>

            {/* Contenido (Overlay) */}
            <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32 flex items-center h-96">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-purple-200 sm:text-4xl">
                        Descubre hermosos lugares a descubrir del valle de aburra
                    </h2>
                    
                    <p className="mt-4 text-lg text-purple-300">
                        "Encuentra las joyas escondidas, los restaurantes mejor valorados y más."
                    </p>

                    <div className="mt-8">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-900 bg-white hover:bg-gray-200 transition duration-150 ease-in-out shadow-lg"
                        >
                            Explorar Lugares
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// -------------------------------------------------------------
// 2. COMPONENTE TARJETA DE LUGAR (PLACE CARD)
// -------------------------------------------------------------
const PlaceCard = ({ name, rating, imageUrl }) => {
    // Genera las estrellas de rating (llenas y vacías)
    const stars = Array(5).fill(0).map((_, index) => (
        <span 
            key={index}
            // Estrella llena (morada brillante) o vacía (gris claro)
            className={`text-2xl ${index < rating ? 'text-purple-500' : 'text-gray-600'}`}
        >
            ★
        </span>
    ));

    return (
        <div className="flex flex-col items-center p-4">
            {/* Imagen del Lugar (Circular con sombra) */}
            <div className="relative w-40 h-40" id='Lugares'>
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-full shadow-lg border-4 border-purple-500 transform transition duration-300 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/000000/FFFFFF?text=Lugar" }}
                />
            </div>
            
            {/* Nombre del Lugar */}
            <p className="mt-4 text-white text-center font-semibold uppercase text-sm tracking-wider">
                {name}
            </p>

            {/* Rating (Estrellas) */}
            <div className="flex justify-center mt-2">
                {stars}
            </div>
        </div>
    );
}

// -------------------------------------------------------------
// 3. COMPONENTE DE SECCIÓN (Dashboard)
// -------------------------------------------------------------
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={null} 
        >
            <Head title="Inicio" />

            {/* SECCIÓN PRINCIPAL HERO HEADER */}
            <HeroHeader />

            {/* SECCIÓN: LUGARES MEJORES PUNTUADOS */}
            <div className="bg-gray-900 py-8 px-10 border-t border-purple-800"></div>
            <div className="bg-gray-900 py-12"> {/* Fondo oscuro para toda la sección */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Título de la Sección */}
                    <h3 title="Lugares"   className="text-3xl font-extrabold text-white text-center mb-10">
                        Lugares mejores puntuados
                    </h3>

                    {/* Contenedor de las Tarjetas (Grid Responsive) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                        {topPlaces.map((place, index) => (
                            <PlaceCard 
                                key={index}
                                name={place.name}
                                rating={place.rating}
                                imageUrl={place.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>

{/* SECCIÓN: RESTAURANTES MÁS BUSCADOS */}
                <div className="bg-gray-900 py-20 px-10 border-t border-purple-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id='Restaurantes'>
                    {/* Título */}
                <h3 className="text-3xl font-extrabold text-white text-center mb-10">
                    Restaurantes más buscados
                </h3>

                    {/* Grid de Tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                {
                    name: "El Patio Paisa",
                    rating: 4.8,
                    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754"
                },
                {
                    name: "Rancherito",
                    rating: 4.6,
                    imageUrl: "https://www.kienyke.com/sites/default/files/styles/interna_contenido_s/public/2025-09/el%20rancherito.png?itok=zfb0o4QQ "
                },
                {
                    name: "Fogón del Sabor",
                    rating: 4.9,
                    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
                }
                        ].map((rest, index) => (
                            <PlaceCard
                                key={index}
                                name={rest.name}
                                rating={rest.rating}
                                imageUrl={rest.imageUrl}
                            />
                        ))}
                    </div>

                </div>
            </div>

    {/* SECCIÓN: CONTÁCTANOS */}
<div className="bg-gray-900 py-16 border-t border-purple-800">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Título */}
        <h3 className="text-3xl font-extrabold text-white text-center mb-10">
            Contacto
        </h3>

        {/* Contenido */}
        <div className="bg p-10 rounded-lg shadow-xl border-800">
            
            {/* Grid de los 3 inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* Nombre */}
                <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-3 rounded-md bg-white text-black"
                />

            {/* Teléfono */}
                <input
                    type="text"
                    placeholder="Teléfono"
                    className="w-full p-3 rounded-md bg-white text-black"
                />

                {/* Correo */}
                <input
                    type="email"
                    placeholder="Dirección de correo"
                    className="w-full p-3 rounded-md bg-white text-black"
                />
            </div>

            {/* Textarea de Mensaje */}
            <textarea
                rows="5"
                placeholder="Mensaje"
                className="w-full p-4 rounded-md bg-white text-black mb-8"
            ></textarea>

            {/* Botón enviar */}
            <div className="text-center">
                <button className="px-6 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition">
                    enviar
                </button>
            </div>

        </div>
   </div>
</div>
        </AuthenticatedLayout>);

}