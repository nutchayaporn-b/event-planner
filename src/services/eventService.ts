import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { EventModel } from "../models/eventModel";

export async function createEvent(event: EventModel, uid: string){
    const docRef = await addDoc(collection(db, "Events"), {
        uid,
        ...event,
        createdAt: new Date(),
        modifiedAt: new Date(),
    })
    console.log('Created event with id: ', docRef.id);
    return docRef.id;
}