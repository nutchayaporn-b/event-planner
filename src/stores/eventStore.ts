import { atom } from "recoil";
import { EventModel } from "../models/eventModel";

const createEventStore = atom<EventModel | null>({
    key: 'CreateEventStore',
    default: null,
})

export {createEventStore};