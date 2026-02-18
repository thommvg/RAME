import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Explorar({ auth, resultados = [], filtros = {} }) {
    const [values, setValues] = useState({
        search: filtros.search || '',
        city: filtros.city || '',
        stars: filtros.stars || '',
    });

    function handleChange(e) {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSearch(e) {
        e.preventDefault();
        router.get('/explorar', values, { preserveState: true });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Explorar Rame</h2>}
        >
            <Head title="Explorar - Rame" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* BARRA DE BÚSQUEDA */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 border border-gray-100">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input
                                type="text"
                                name="search"
                                placeholder="Buscar lugares o restaurantes..."
                                className="border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
                                value={values.search}
                                onChange={handleChange}
                            />
                            
                            <select 
                                name="city" 
                                className="border-gray-300 rounded-xl focus:ring-purple-500"
                                value={values.city}
                                onChange={handleChange}
                            >
                                <option value="">Todas las ciudades</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Bello">Bello</option>
                                <option value="Itagüí">Itagüí</option>
                                <option value="Envigado">Envigado</option>
                            </select>

                            <select 
                                name="stars" 
                                className="border-gray-300 rounded-xl focus:ring-purple-500"
                                value={values.stars}
                                onChange={handleChange}
                            >
                                <option value="">Calificación</option>
                                <option value="5">5 Estrellas</option>
                                <option value="4">4 Estrellas</option>
                                <option value="3">3 Estrellas</option>
                            </select>

                            <button type="submit" className="bg-purple-600 text-white rounded-xl py-2.5 font-bold hover:bg-purple-700 transition-all shadow-md shadow-purple-100">
                                Filtrar
                            </button>
                        </form>
                    </div>

                    {/* GRILLA DE RESULTADOS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resultados.length > 0 ? (
                            resultados.map((item) => (
                                <div key={`${item.tipo}-${item.id}`} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className="relative h-52">
                                        <img 
                                            src={item.imagen} 
                                            alt={item.nombre} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-purple-600 uppercase">
                                            {item.tipo}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-bold text-gray-900">{item.nombre}</h3>
                                            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                                                <span className="text-yellow-500 mr-1">★</span>
                                                <span className="text-sm font-bold text-yellow-700">
                                                    {item.puntuacion_final ? Number(item.puntuacion_final).toFixed(1) : "0.0"}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-gray-500 text-sm mb-6 flex items-center">
                                            <span className="mr-1">📍</span> {item.ciudad}
                                        </p>

                                        <Link 
                                            href={item.tipo === 'Lugar' ? `/lugares/${item.id}` : `/restaurantes/${item.id}`}
                                            className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors"
                                        >
                                            Ver más
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                                <p className="text-gray-400">No hay resultados que coincidan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}