import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

// --- 1. COMPONENTE HERO ---
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

// --- 2. COMPONENTE TARJETA CIRCULAR ---
const PlaceCard = ({ name, rating, imageUrl }) => {
    const numericRating = Math.round(rating || 0);
    const stars = Array(5).fill(0).map((_, index) => (
        <span key={index} className={`text-2xl ${index < numericRating ? 'text-purple-500' : 'text-gray-600'}`}>★</span>
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
            <p className="mt-4 text-white text-center font-semibold uppercase text-sm">{name}</p>
            <div className="flex mt-2">{stars}</div>
        </div>
    );
};

// --- 3. DASHBOARD PRINCIPAL ---
export default function Dashboard({ auth, lugares, restaurantes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        tipo_entidad: 'lugar', 
        nombre: '',
        descripcion: '',
        direccion: '',
        ciudad_id: '',
        tipo_de_turismo_id: '',
        puntuacion: 5,
        comentario: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('dashboard.store'), {
            onSuccess: () => { setIsModalOpen(false); reset(); }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Inicio" />
            <HeroHeader />

            {/* SECCIÓN LUGARES MEJOR PUNTUADOS */}
            <div className="bg-gray-900 py-12 border-t border-purple-800" id="Lugares">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-extrabold text-white text-center mb-10">Lugares mejor puntuados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {lugares?.map((place) => (
                            <PlaceCard key={place.id} name={place.nombre} rating={place.valoraciones_avg_puntuacion} imageUrl={place.imagen} />
                        ))}
                    </div>
                </div>
            </div>

            {/* SECCIÓN RESTAURANTES */}
            <div className="bg-gray-900 py-20 border-t border-purple-800" id="Restaurantes">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-3xl font-extrabold text-white text-center mb-10">Restaurantes más buscados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {restaurantes?.map((rest) => (
                            <PlaceCard key={rest.id} name={rest.nombre} rating={rest.valoraciones_avg_puntuacion} imageUrl={rest.imagen} />
                        ))}
                    </div>
                </div>
            </div>

            {/* SECCIÓN CONTACTO (RECUPERADA) */}
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

            {/* BOTÓN FLOTANTE PÚRPURA */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-10 left-10 w-16 h-16 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center text-4xl z-50 transition-all hover:scale-110 active:scale-95 border-2 border-purple-400"
            >
                +
            </button>

            {/* MODAL INTEGRADO CORRECTAMENTE */}
            {/* MODAL DINÁMICO MEJORADO */}
{isModalOpen && (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <div className="bg-gray-900 border border-purple-500/30 w-full max-w-lg rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6 text-white">
                <h2 className="text-2xl font-bold">Nuevo Registro</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-3xl">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-white">
                {/* Selector Tipo de Entidad */}
                <div className="flex bg-gray-800 p-1 rounded-xl mb-2">
                    <button type="button" onClick={() => setData('tipo_entidad', 'lugar')} 
                        className={`flex-1 py-2 rounded-lg font-bold transition ${data.tipo_entidad === 'lugar' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>📍 Lugar</button>
                    <button type="button" onClick={() => setData('tipo_entidad', 'restaurante')} 
                        className={`flex-1 py-2 rounded-lg font-bold transition ${data.tipo_entidad === 'restaurante' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>🍴 Restaurante</button>
                </div>

                {/* Nombre y Dirección */}
                <div className="space-y-3">
                    <input type="text" placeholder="Nombre del sitio" value={data.nombre} onChange={e => setData('nombre', e.target.value)} 
                        className="w-full bg-gray-800 border-gray-700 rounded-lg text-white focus:ring-purple-500" />
                    
                    <input type="text" placeholder="Dirección exacta" value={data.direccion} onChange={e => setData('direccion', e.target.value)} 
                        className="w-full bg-gray-800 border-gray-700 rounded-lg text-white focus:ring-purple-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Ciudad */}
                    <select value={data.ciudad_id} onChange={e => setData('ciudad_id', e.target.value)} 
                        className="bg-gray-800 border-gray-700 rounded-lg text-white">
                        <option value="">Ciudad</option>
                        <option value="1">Medellín</option><option value="2">Envigado</option>
                        <option value="3">Itagüí</option><option value="4">Sabaneta</option>
                        <option value="5">Bello</option><option value="6">La Estrella</option>
                        <option value="7">Caldas</option><option value="8">Copacabana</option>
                        <option value="9">Girardota</option><option value="10">Barbosa</option>
                    </select>

                    {/* CATEGORÍAS DINÁMICAS */}
                    <select value={data.tipo_de_turismo_id} onChange={e => setData('tipo_de_turismo_id', e.target.value)} 
                        className="bg-gray-800 border-gray-700 rounded-lg text-white">
                        <option value="">Categoría</option>
                        {data.tipo_entidad === 'lugar' ? (
                            <>
                                <option value="2">Naturaleza</option>
                                <option value="3">Cultura / Historia</option>
                                <option value="4">Aventura / Deporte</option>
                                <option value="5">Religioso</option>
                            </>
                        ) : (
                            <>
                                <option value="1">Comida Típica</option>
                                <option value="2">Internacional</option>
                                <option value="3">Parrilla / Carnes</option>
                                <option value="4">Comida Rápida</option>
                                <option value="5">Gourmet</option>
                            </>
                        )}
                    </select>
                </div>

                {/* VALORACIÓN AMPLIADA */}
                <div className="p-4 bg-gray-800/50 rounded-xl border border-purple-500/20">
                    <label className="text-purple-400 text-xs font-bold block mb-2 uppercase">Tu experiencia</label>
                    <select value={data.puntuacion} onChange={e => setData('puntuacion', e.target.value)} 
                        className="w-full bg-gray-700 border-none rounded-lg text-white mb-3">
                        <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                        <option value="4">⭐⭐⭐⭐ (Muy Bueno)</option>
                        <option value="3">⭐⭐⭐ (Bueno)</option>
                        <option value="2">⭐⭐ (Regular)</option>
                        <option value="1">⭐ (Malo)</option>
                    </select>
                    <textarea placeholder="Cuéntanos más detalles..." value={data.comentario} onChange={e => setData('comentario', e.target.value)} 
                        className="w-full bg-gray-700 border-none rounded-lg text-sm h-20 text-white placeholder-gray-500"></textarea>
                </div>

                <button type="submit" disabled={processing} className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95">
                    {processing ? 'PROCESANDO...' : 'GUARDAR AHORA'}
                </button>
            </form>
        </div>
    </div>
)}

        </AuthenticatedLayout>
    );
}