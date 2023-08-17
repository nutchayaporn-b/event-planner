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
}

export type EventType = "Regular" | "Private";
