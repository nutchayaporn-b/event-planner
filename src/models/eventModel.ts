export interface EventModel {
  id?: string;
  type?: EventType;
  name?: string;
  description?: string;
  date?: Date;
  location?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  image?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export type EventType = "Regular" | "Private";
