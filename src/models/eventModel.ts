import { Timestamp } from "firebase/firestore";

export interface EventModel {
  id?: string;
  code?: string;
  type?: EventType;
  name?: string;
  description?: string;
  date?: Timestamp;
  location?: ILocation;
  locationName?: string;
  image?: string;
  createdAt?: Timestamp;
  modifiedAt?: Timestamp;
  donation?: DonationInfo;
  participants?: Participant[];
  donations?: Donation[];
  messages?: Message[];
}

export interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface DonationInfo {
  accountNumber: string;
  holderName: string;
  bankName: string;
}

export interface Participant {
  uid: string;
  checkIn: boolean;
}

export interface Donation {
  uid: string;
  name: string;
  image: string;
  amount: number;
  status: DonationStatus;
}

export interface Message {
  uid: string;
  message: string;
}

export type DonationStatus = "PENDING" | "APPROVED" | "REJECTED";

export type EventType = "Regular" | "Private";
