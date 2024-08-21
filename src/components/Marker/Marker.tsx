import React, { useState, useCallback } from "react";
import { Marker as MapMarker, MarkerDragEvent } from "react-map-gl";
import markerIcon from "../../assets/marker.svg";
import style from "./Marker.module.css";

interface MarkerProps {
  latitude: number;
  longitude: number;
  onClick?: () => void;
  id: number;
  onDragEnd: (latitude: number, longitude: number) => void;
}

const Marker: React.FC<MarkerProps> = ({
  latitude,
  longitude,
  onClick,
  id,
  onDragEnd,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (event: MarkerDragEvent) => {
      setDragging(false);
      const { lngLat } = event;
      onDragEnd(lngLat.lat, lngLat.lng);
    },
    [onDragEnd]
  );

  return (
    <MapMarker
      latitude={latitude}
      longitude={longitude}
      onClick={onClick}
      anchor="bottom"
      style={{ cursor: dragging ? "grabbing" : "pointer", height: "2rem" }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={true}
      className={style.container}
    >
      <img
        className={style.markerIcon}
        src={markerIcon}
        alt="Marker"
        style={{ cursor: "pointer" }}
      />
      <p className={style.number}>{id}</p>
    </MapMarker>
  );
};

export default Marker;
