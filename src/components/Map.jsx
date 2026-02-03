import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter map when coords change
const RecenterMap = ({ lat, lon }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lon]);
    }, [lat, lon, map]);
    return null;
};

const Map = ({ lat, lon }) => {
    if (!lat || !lon) return null;

    return (
        <div className="map-container card">
            <h3>Location Map</h3>
            <div className="map-wrapper">
                <MapContainer center={[lat, lon]} zoom={10} scrollWheelZoom={false} style={{ height: '300px', width: '100%', borderRadius: '12px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Weather Overlay - Temperature (OpenWeatherMap free tiles need API key, so we use standard base map + marker for now) 
              Alternatively, OpenMeteo doesn't provide tiles directly. 
              We'll stick to basic location map as requested "Integrate a map view showing the selected city".
          */}

                    <Marker position={[lat, lon]}>
                        {/* Popup content could go here */}
                    </Marker>
                    <RecenterMap lat={lat} lon={lon} />
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
