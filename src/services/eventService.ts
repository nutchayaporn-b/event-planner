import { doc, setDoc, getDoc, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import { EventModel } from "../models/eventModel";
import { generateUniqueId } from "../utils/common";

export async function createEvent(event: EventModel, uid: string){
    const docRef = await addDoc(collection(db, "Events"), {
        id: generateUniqueId(),
        uid,
        ...event,
        createdAt: new Date(),
        modifiedAt: new Date(),
    })
    console.log('Created event with id: ', docRef.id);
    return docRef.id;
}

export async function getEventsByUID(uid: string){
    const docRef = await getDocs(query(collection(db, "Events"), where('uid', '==', uid)));
    return docRef.docs.map(d => d.data())
}