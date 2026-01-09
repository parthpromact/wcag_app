import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { Map as LeafletMap } from "leaflet";

export default function MapController({
  onReady,
}: {
  onReady: (map: LeafletMap) => void;
}) {
  const map = useMap();

  useEffect(() => {
    onReady(map);
  }, [map, onReady]);

  return null;
}
