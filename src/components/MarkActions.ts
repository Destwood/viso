import { db } from "../firebase/firebaseConfig";
import { IMarker } from "../types/index";
import { collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";


export const getMarkersFromFirebase = async (): Promise<IMarker[]> => {
  try {
    const markersCollection = collection(db, "markers");
    const markerSnapshot = await getDocs(markersCollection);
    return markerSnapshot.docs.map((doc) => doc.data() as IMarker);
  } catch (error) {
    console.error("Error fetching markers from Firebase:", error);
    return [];
  }
};

export const updateMarkerInFirebase = async (marker: IMarker): Promise<void> => {
  try {
    const markerDoc = doc(db, "markers", marker.id.toString());
    await setDoc(markerDoc, marker);
  } catch (error) {
    console.error("Error updating marker in Firebase:", error);
  }
};

export const deleteAllMarkersFromFirebase = async () => {
  try {
    const markersCollection = collection(db, "markers");
    const markerSnapshot = await getDocs(markersCollection);

    const batch = writeBatch(db); 
    markerSnapshot.docs.forEach((markerDoc) => {
      batch.delete(doc(db, "markers", markerDoc.id));
    });

    await batch.commit(); 
  } catch (error) {
    console.error("Помилка при видаленні маркерів: ", error);
  }
};

export const deleteMarkerFromFirebase = async (id: number): Promise<void> => {
  try {
    const markerDoc = doc(db, "markers", id.toString());
    await deleteDoc(markerDoc);
  } catch (error) {
    console.error(`Помилка при видаленні маркера з ID ${id}:`, error);
  }
};