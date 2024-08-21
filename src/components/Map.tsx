import React from "react";
import ReactMapGL, { ViewStateChangeEvent, MapMouseEvent } from "react-map-gl";
import { IMarker } from "../types/index";
import Marker from "./Marker/Marker";

interface MapProps {
  initialLatitude: number;
  initialLongitude: number;
  zoom: number;
  markers: IMarker[];
  onMarkerUpdate: (marker: IMarker) => void;
  onMarkerDelete: (id: number) => void;
  createNewMarker: (latitude: number, longitude: number) => IMarker;
}

const Map: React.FC<MapProps> = ({
  initialLatitude,
  initialLongitude,
  zoom,
  markers,
  onMarkerUpdate,
  onMarkerDelete,
  createNewMarker,
}) => {
  const [viewport, setViewport] = React.useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: zoom,
    width: "100%",
    height: "100%",
  });

  const [clickedMarkerId, setClickedMarkerId] = React.useState<number | null>(
    null
  );

  const handleViewportChange = (event: ViewStateChangeEvent) => {
    setViewport({
      latitude: event.viewState.latitude,
      longitude: event.viewState.longitude,
      zoom: event.viewState.zoom,
      width: viewport.width,
      height: viewport.height,
    });
  };

  const handleMapClick = (event: MapMouseEvent) => {
    const [longitude, latitude] = [event.lngLat.lng, event.lngLat.lat];

    if (clickedMarkerId !== null) {
      onMarkerDelete(clickedMarkerId);
      setClickedMarkerId(null);
    } else {
      const newMarker = createNewMarker(latitude, longitude);
      onMarkerUpdate(newMarker);
    }
  };

  return (
    <div className="mapContainer">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        mapboxAccessToken={process.env.MAPBOX_TOKEN}
        onMove={handleViewportChange}
        onClick={handleMapClick}
      >
        {markers.map((marker: IMarker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            id={marker.id}
            onClick={() => {
              setClickedMarkerId(marker.id);
              onMarkerDelete(marker.id);
            }}
            onDragEnd={(lat: number, lng: number) =>
              onMarkerUpdate({ id: marker.id, latitude: lat, longitude: lng })
            }
          />
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
