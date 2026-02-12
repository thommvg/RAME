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
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para el aviso de éxito

    // FORMULARIO 1: REGISTRO DE LUGARES/RESTAURANTES
    const { 
        data: lugarData, 
        setData: setLugarData, 
        post: postLugar, 
        processing: processingLugar, 
        errors: errorsLugar, 
        reset: resetLugar 
    } = useForm({
        tipo_entidad: 'lugar', 
        nombre: '',
        direccion: '',
        ciudad: '', 
        comentario: '',
        puntuacion: 5,
        imagen: '',
        tipo_de_turismo_id: '', 
    });

    // FORMULARIO 2: CONTACTO
    const { 
        data: contactoData, 
        setData: setContactoData, 
        post: postContacto, 
        processing: processingContacto, 
        errors: errorsContacto, 
        reset: resetContacto 
    } = useForm({
        nombre: '',
        telefono: '',
        correo: '',
        mensaje: '',
    });

    const handleLugarSubmit = (e) => {
        e.preventDefault();
        postLugar(route('dashboard.store'), {
            preserveScroll: true,
            onSuccess: () => { 
                setIsModalOpen(false); 
                resetLugar(); 
            }
        });
    };

    const handleContactoSubmit = (e) => {
        e.preventDefault();
        postContacto(route('contacto.store'), {
            preserveScroll: true,
            onSuccess: () => {
                resetContacto();
                setShowSuccessMessage(true); // Mostrar mensaje de éxito
                setTimeout(() => setShowSuccessMessage(false), 5000); // Quitarlo a los 5 segundos
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Inicio" />
            <HeroHeader />

            {/* SECCIÓN LUGARES */}
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

            {/* SECCIÓN CONTACTO */}
            <div className="bg-gray-900 py-16 border-t border-purple-800">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-extrabold text-white text-center mb-10">Contacto</h3>
                    
                    <form onSubmit={handleContactoSubmit} noValidate className="p-10">
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            {/* Nombre */}
                            <div className="flex flex-col">
                                <input 
                                    type="text" placeholder="Nombre" 
                                    value={contactoData.nombre} onChange={e => setContactoData('nombre', e.target.value)}
                                    className={`w-full p-3 rounded bg-white text-black ${errorsContacto.nombre ? 'ring-2 ring-red-500' : ''}`} 
                                />
                                {errorsContacto.nombre && <span className="text-red-400 text-xs mt-1">{errorsContacto.nombre}</span>}
                            </div>

                            {/* Teléfono (Solo números) */}
                            <div className="flex flex-col">
                                <input 
                                    type="text" inputMode="numeric" placeholder="Teléfono" 
                                    value={contactoData.telefono} 
                                    onChange={e => setContactoData('telefono', e.target.value.replace(/[^0-9]/g, ''))}
                                    className={`w-full p-3 rounded bg-white text-black ${errorsContacto.telefono ? 'ring-2 ring-red-500' : ''}`} 
                                />
                                {errorsContacto.telefono && <span className="text-red-400 text-xs mt-1">{errorsContacto.telefono}</span>}
                            </div>

                            {/* Correo (type="text" para evitar burbujas HTML) */}
                            <div className="flex flex-col">
                                <input 
                                    type="text" placeholder="Correo" 
                                    value={contactoData.correo} onChange={e => setContactoData('correo', e.target.value)}
                                    className={`w-full p-3 rounded bg-white text-black ${errorsContacto.correo ? 'ring-2 ring-red-500' : ''}`} 
                                />
                                {errorsContacto.correo && <span className="text-red-400 text-xs mt-1">{errorsContacto.correo}</span>}
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="flex flex-col">
                            <textarea 
                                placeholder="Mensaje" 
                                value={contactoData.mensaje} onChange={e => setContactoData('mensaje', e.target.value)}
                                className={`w-full p-3 rounded bg-white text-black mb-6 ${errorsContacto.mensaje ? 'ring-2 ring-red-500' : ''}`}
                            ></textarea>
                            {errorsContacto.mensaje && <p className="text-red-400 text-xs -mt-4 mb-4">{errorsContacto.mensaje}</p>}
                        </div>
                        
                        {/* Mensaje de éxito visual */}
                        {showSuccessMessage && (
                            <div className="mb-6 p-4 bg-purple-600/20 border border-purple-500 text-purple-200 rounded-lg text-center animate-pulse">
                                ¡Gracias! Tu mensaje ha sido enviado correctamente. ✨
                            </div>
                        )}

                        <div className="text-center">
                            <button type="submit" disabled={processingContacto} className="px-6 py-2 bg-purple-800 text-white rounded hover:bg-purple-900 transition shadow-lg">
                                {processingContacto ? 'Enviando...' : 'Enviar Mensaje'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* BOTÓN FLOTANTE */}
            <button
                onClick={() => { resetLugar(); setIsModalOpen(true); }}
                className="fixed bottom-10 left-10 w-16 h-16 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center text-4xl z-50 transition-all border-2 border-purple-400"
            >
                +
            </button>

            {/* MODAL REGISTRO */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                    <div className="bg-gray-900 border border-purple-500/30 w-full max-w-lg rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6 text-white">
                            <h2 className="text-2xl font-bold">Nuevo Registro</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                        </div>

                        <form onSubmit={handleLugarSubmit} noValidate className="space-y-4 text-white">
                            <div className="flex bg-gray-800 p-1 rounded-xl mb-2">
                                <button type="button" onClick={() => setLugarData('tipo_entidad', 'lugar')} 
                                    className={`flex-1 py-2 rounded-lg font-bold transition ${lugarData.tipo_entidad === 'lugar' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>📍 Lugar</button>
                                <button type="button" onClick={() => setLugarData('tipo_entidad', 'restaurante')} 
                                    className={`flex-1 py-2 rounded-lg font-bold transition ${lugarData.tipo_entidad === 'restaurante' ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>🍴 Restaurante</button>
                            </div>

                            <div className="flex flex-col">
                                <input type="text" placeholder="Nombre" value={lugarData.nombre} onChange={e => setLugarData('nombre', e.target.value)} 
                                    className={`w-full bg-gray-800 border-gray-700 rounded-lg text-white ${errorsLugar.nombre ? 'ring-2 ring-red-500' : ''}`} />
                                {errorsLugar.nombre && <span className="text-red-400 text-xs mt-1">{errorsLugar.nombre}</span>}
                            </div>
                            
                            <div className="flex flex-col">
                                <input type="text" placeholder="Dirección" value={lugarData.direccion} onChange={e => setLugarData('direccion', e.target.value)} 
                                    className={`w-full bg-gray-800 border-gray-700 rounded-lg text-white ${errorsLugar.direccion ? 'ring-2 ring-red-500' : ''}`} />
                                {errorsLugar.direccion && <span className="text-red-400 text-xs mt-1">{errorsLugar.direccion}</span>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <select value={lugarData.ciudad} onChange={e => setLugarData('ciudad', e.target.value)} className={`bg-gray-800 border-gray-700 rounded-lg text-white ${errorsLugar.ciudad ? 'ring-2 ring-red-500' : ''}`}>
                                        <option value="">Ciudad</option>
                                        <option value="Medellín">Medellín</option>
                                        <option value="Envigado">Envigado</option>
                                        <option value="Itagüí">Itagüí</option>
                                        <option value="Sabaneta">Sabaneta</option>
                                        <option value="Bello">Bello</option>
                                    </select>
                                    {errorsLugar.ciudad && <span className="text-red-400 text-xs mt-1">{errorsLugar.ciudad}</span>}
                                </div>

                                <select value={lugarData.tipo_de_turismo_id} onChange={e => setLugarData('tipo_de_turismo_id', e.target.value)} className="bg-gray-800 border-gray-700 rounded-lg text-white">
                                    <option value="">Categoría</option>
                                    {lugarData.tipo_entidad === 'lugar' ? (
                                        <><option value="2">Naturaleza</option><option value="3">Cultura</option></>
                                    ) : (
                                        <><option value="1">Típica</option><option value="2">Internacional</option></>
                                    )}
                                </select>
                            </div>

                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <select value={lugarData.puntuacion} onChange={e => setLugarData('puntuacion', e.target.value)} className="w-full bg-gray-700 border-none rounded-lg text-white mb-3">
                                    <option value="5">⭐⭐⭐⭐⭐</option>
                                    <option value="4">⭐⭐⭐⭐</option>
                                    <option value="3">⭐⭐⭐</option>
                                </select>
                                <textarea placeholder="Comentario..." value={lugarData.comentario} onChange={e => setLugarData('comentario', e.target.value)} className={`w-full bg-gray-700 border-none rounded-lg text-white text-sm h-20 ${errorsLugar.comentario ? 'ring-2 ring-red-500' : ''}`}></textarea>
                                {errorsLugar.comentario && <span className="text-red-400 text-xs mt-1">{errorsLugar.comentario}</span>}
                            </div>

                            <div className="flex flex-col">
                                <input type="text" placeholder="URL Imagen" value={lugarData.imagen} onChange={e => setLugarData('imagen', e.target.value)} 
                                    className={`w-full bg-gray-800 border-gray-700 rounded-lg text-white text-sm ${errorsLugar.imagen ? 'ring-2 ring-red-500' : ''}`} />
                                {errorsLugar.imagen && <span className="text-red-400 text-xs mt-1">{errorsLugar.imagen}</span>}
                            </div>

                            <button type="submit" disabled={processingLugar} className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg">
                                {processingLugar ? 'GUARDANDO...' : 'GUARDAR AHORA'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}