import { Timestamp } from "firebase/firestore";

export interface EventModel {
  id?: string;
  type?: EventType;
  name?: string;
  description?: string;
  date?: Timestamp;
  location?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  image?: string;
  createdAt?: Timestamp;
  modifiedAt?: Timestamp;
}

export type EventType = "Regular" | "Private";
