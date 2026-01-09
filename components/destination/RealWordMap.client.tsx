"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { Map as LeafletMap } from "leaflet";
import MapController from "./MapController";

interface Destination {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
}

const lucidePinIcon = L.divIcon({
  className: "lucide-marker",
  html: `
    <div style="transform: translate(-50%, -100%);">
      <svg xmlns="http://www.w3.org/2000/svg"
        width="28" height="28"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 1 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], 6, { duration: 1 });
  }, [lat, lng, map]);

  return null;
}

export default function RealWorldMap({
  destinations,
  selected,
  onMapReady,
}: {
  destinations: Destination[];
  selected?: Destination;
  onMapReady: (map: LeafletMap) => void;
}) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-full rounded-lg"
      keyboard
    >
      <MapController onReady={onMapReady} />
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}

      {destinations.map((d) => (
        <Marker key={d.id} position={[d.lat, d.lng]} icon={lucidePinIcon}>
          <Popup>
            <strong>{d.name}</strong>
            <br />
            {d.country}
            <br />
            {d.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
