import { doc, setDoc, getDoc, addDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../App";
import { Donation, EventModel } from "../models/eventModel";
import { generateUniqueId } from "../utils/common";

export async function createEvent(event: EventModel, uid: string) {
  const docRef = await addDoc(collection(db, "Events"), {
    code: generateUniqueId(),
    uid,
    ...event,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
  console.log("Created event with id: ", docRef.id);
  await setDoc(
    doc(db, "Events", docRef.id),
    {
      id: docRef.id,
    },
    { merge: true }
  );
  return docRef.id;
}

export async function getEventsByUID(uid: string): Promise<EventModel[]> {
  const docRef = await getDocs(query(collection(db, "Events"), where("uid", "==", uid)));
  return docRef.docs.map((d) => d.data());
}

export async function getPublicEvents(): Promise<EventModel[]> {
  const docRef = await getDocs(query(collection(db, "Events"), where("type", "==", "Regular")));
  return docRef.docs.map((d) => d.data());
}

export async function getEventByCode(code: string): Promise<EventModel | null> {
  const docRef = await getDocs(query(collection(db, "Events"), where("code", "==", code), limit(1)));
  return docRef.docs[0].data() || null;
}

export async function getRegisteredEvents(uid: string): Promise<EventModel[]> {
  const docRef = await getDocs(
    query(
      collection(db, "Events"),
      where("participants", "array-contains-any", [
        { uid, checkIn: false },
        { uid, checkIn: true },
      ])
    )
  );
  return docRef.docs.map((d) => d.data());
}

export async function getAllDonationsByEventId(eventId: string): Promise<Donation[]> {
  const docRef = await getDoc(doc(db, "Events", eventId));
  return docRef.data()?.donations || [];
}

export async function updateEventService(event: EventModel) {
  const docRef = await setDoc(doc(db, "Events", event.id as string), {
    ...event,
    modifiedAt: new Date(),
  });
  console.log("Updated event with id: ", event.id);
  return docRef;
}

export async function joinEventService(event: EventModel, uid: string) {
  const docRef = await setDoc(
    doc(db, "Events", event.id as string),
    {
      participants: [...(event.participants || []), { uid, checkIn: false }],
    },
    { merge: true }
  );
  console.log("Joined event with id: ", event.id);
  return docRef;
}

export async function checkInEventService(event: EventModel, uid: string) {
  const docRef = await setDoc(
    doc(db, "Events", event.id as string),
    {
      participants: event.participants?.map((p) => (p.uid === uid ? { ...p, checkIn: true } : p)),
    },
    { merge: true }
  );
  console.log("Checked in event with id: ", event.id);
  return docRef;
}

export async function donateEventService(event: EventModel, uid: string, name: string, image: string, amount: string) {
  const docRef = await setDoc(
    doc(db, "Events", event.id as string),
    {
      donations: [...(event.donations || []), { uid, name, image, amount, status: "PENDING" }],
    },
    { merge: true }
  );
  console.log("Donated event with id: ", event.id);
  return docRef;
}

export async function updateDonationStatusService(event: EventModel, donationId: string, status: string) {
  const docRef = await setDoc(
    doc(db, "Events", event.id as string),
    {
      donations: event.donations?.map((d) => (d.uid === donationId ? { ...d, status } : d)),
    },
    { merge: true }
  );
  console.log("Updated donation status with id: ", event.id);
  return docRef;
}
