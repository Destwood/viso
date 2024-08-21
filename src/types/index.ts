export interface IMarker {
  latitude: number;
  longitude: number;
  id: number;
}
export interface Quest {
  location: { latitude: number; longitude: number };
  timestamp: number;
  next?: number; // Номер наступного Quest
}
