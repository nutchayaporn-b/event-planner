import { doc, setDoc, getDoc, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App";
import { EventModel } from "../models/eventModel";
import { generateUniqueId } from "../utils/common";

export async function createEvent(event: EventModel, uid: string){
    const docRef = await addDoc(collection(db, "Events"), {
        code: generateUniqueId(),
        uid,
        ...event,
        createdAt: new Date(),
        modifiedAt: new Date(),
    })
    console.log('Created event with id: ', docRef.id);
    await setDoc(doc(db, "Events", docRef.id), {
        id: docRef.id,
    }, {merge: true})
    return docRef.id;
}

export async function getEventsByUID(uid: string){
    const docRef = await getDocs(query(collection(db, "Events"), where('uid', '==', uid)));
    return docRef.docs.map(d => d.data())
}

export async function updateEventService(event: EventModel){
    const docRef = await setDoc(doc(db, "Events", event.id as string), {
        ...event,
        modifiedAt: new Date(),
    })
    console.log('Updated event with id: ', event.id);
    return docRef;
}