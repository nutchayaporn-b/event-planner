export interface EventModel {
  id: string;
  type: EventType
  name: string;
  description: string;
  date?: Date;
  location: string;
  image: string;
}

export type EventType = "Regular" | "Private"