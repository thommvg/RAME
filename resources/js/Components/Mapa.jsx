import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


// colores disponibles
const colores = [
    "red",
    "blue",
    "green",
    "orange",
    "yellow",
    "violet"
];

const iconCache = {};

function crearIcono(color) {

    return new L.Icon({

        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,

        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

        iconSize: [25, 41],

        iconAnchor: [12, 41],

        popupAnchor: [1, -34],

        shadowSize: [41, 41],

    });

}

function obtenerIconoParaLugar(id) {

    if (iconCache[id]) return iconCache[id];

    const color = colores[Math.floor(Math.random() * colores.length)];

    const icono = crearIcono(color);

    iconCache[id] = icono;

    return icono;

}



export default function Mapa({ center = [6.2442, -75.5812], lugares = [] }) {

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markersLayer = useRef(null);
    const markersRef = useRef({});
    const userMarkerRef = useRef(null);


    // crear mapa
    useEffect(() => {

        if (!mapRef.current || mapInstance.current) return;

        const map = L.map(mapRef.current).setView(center, 13);

        mapInstance.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

            attribution: "&copy; OpenStreetMap contributors",

        }).addTo(map);

        markersLayer.current = L.layerGroup().addTo(map);


        // geolocalización (CORREGIDO)
        if ("geolocation" in navigator) {

            navigator.geolocation.getCurrentPosition((pos) => {

                const { latitude, longitude } = pos.coords;

                const userIcon = new L.Icon({
                    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
                    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                });

                const userMarker = L.marker([latitude, longitude], {
                    icon: userIcon
                })
                .bindPopup("📍 Estás aquí");

                userMarker.addTo(map);

                userMarkerRef.current = userMarker;

            },
            (error) => {
                console.log("No se pudo obtener la ubicación:", error);
            });

        }

    }, []);



    // actualizar marcadores
    useEffect(() => {

        if (!mapInstance.current || !markersLayer.current) return;

        const map = mapInstance.current;
        const layer = markersLayer.current;

        layer.clearLayers();

        markersRef.current = {};

        const markers = [];

        lugares.forEach((lugar) => {

            if (lugar.lat && lugar.lng) {

                const lat = parseFloat(lugar.lat);
                const lng = parseFloat(lugar.lng);

                if (!isNaN(lat) && !isNaN(lng)) {

                    const marker = L.marker([lat, lng], {

                        icon: obtenerIconoParaLugar(lugar.id)

                    })
                    .bindPopup(`
                        <strong>${lugar.nombre}</strong><br/>
                        ${lugar.direccion}<br/>
                        ${lugar.ciudad}
                    `);

                    layer.addLayer(marker);

                    markers.push(marker);

                    markersRef.current[lugar.id] = marker;

                }

            }

        });

        if (markers.length > 0) {

            const group = L.featureGroup(markers);

            map.fitBounds(group.getBounds(), {

                padding: [50, 50]

            });

        }

    }, [lugares]);



    // centrar desde sidebar
    function centrarLugar(lugar) {

        const marker = markersRef.current[lugar.id];

        if (marker && mapInstance.current) {

            mapInstance.current.setView(marker.getLatLng(), 16);

            marker.openPopup();

        }

    }



    return (

        <div className="flex gap-4 w-full h-[600px] bg-purple-600 p-1 rounded-xl">


            {/* SIDEBAR */}

            <div className="w-80 bg-white rounded-xl shadow-lg overflow-y-auto">

                <div className="p-4 border-b font-bold text-lg">

                    📍 Ubicaciones

                </div>

                {lugares.length === 0 && (

                    <div className="p-4 text-gray-500">

                        No hay ubicaciones aún

                    </div>

                )}

                {lugares.map((lugar) => (

                    <div
                        key={lugar.id}
                        onClick={() => centrarLugar(lugar)}
                        className="p-4 border-b cursor-pointer hover:bg-gray-100 transition"
                    >

                        <div className="font-semibold">

                            {lugar.nombre}

                        </div>

                        <div className="text-sm text-gray-500">

                            {lugar.direccion}

                        </div>

                        <div className="text-xs text-gray-400">

                            {lugar.ciudad}

                        </div>

                    </div>

                ))}

            </div>



            {/* MAPA */}

            <div className="flex-1 rounded-xl overflow-hidden shadow-lg">

                <div
                    ref={mapRef}
                    className="w-full h-full"
                ></div>

            </div>


        </div>

    );

}