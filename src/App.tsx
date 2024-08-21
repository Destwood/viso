import { useEffect, useState } from "react";
import Map from "./components/Map";
import { IMarker } from "./types/index";
import {
  getMarkersFromFirebase,
  updateMarkerInFirebase,
  deleteAllMarkersFromFirebase,
  deleteMarkerFromFirebase,
} from "./components/MarkActions";
import "./App.css";

function App() {
  const initialLatitude = 49.83826;
  const initialLongitude = 24.02324;
  const zoom = 12;
  const [markers, setMarkers] = useState<IMarker[]>([]);

  const fetchMarkers = async () => {
    const fetchedMarkers = await getMarkersFromFirebase();
    setMarkers(fetchedMarkers);
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const handleMarkerUpdate = async (updatedMarker: IMarker) => {
    const existingMarker = markers.find(
      (marker) => marker.id === updatedMarker.id
    );

    if (!existingMarker) {
      setMarkers((prevMarkers) => [...prevMarkers, updatedMarker]);
    } else {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === updatedMarker.id ? updatedMarker : marker
        )
      );
    }

    await updateMarkerInFirebase(updatedMarker);
  };

  const handleDeleteAllMarkers = async () => {
    await deleteAllMarkersFromFirebase();
    setMarkers([]);
  };

  const getNextId = (markers: IMarker[]): number => {
    const ids = markers.map((marker) => marker.id);
    let nextId = 1;

    while (ids.includes(nextId)) {
      nextId++;
    }

    return nextId;
  };

  const handleMarkerDelete = async (id: number) => {
    await deleteMarkerFromFirebase(id);
    setMarkers((prevMarkers) =>
      prevMarkers.filter((marker) => marker.id !== id)
    );
  };

  const createNewMarker = (latitude: number, longitude: number): IMarker => {
    const newMarker: IMarker = {
      latitude,
      longitude,
      id: getNextId(markers),
    };
    return newMarker;
  };

  return (
    <div className="container">
      <Map
        initialLatitude={initialLatitude}
        initialLongitude={initialLongitude}
        zoom={zoom}
        markers={markers}
        onMarkerUpdate={handleMarkerUpdate}
        onMarkerDelete={handleMarkerDelete}
        createNewMarker={createNewMarker}
      />
      <button onClick={handleDeleteAllMarkers}>Delete All Markers</button>
    </div>
  );
}

export default App;
