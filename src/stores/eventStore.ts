import { atom } from "recoil";
import { EventModel } from "../models/eventModel";

const createEventStore = atom<EventModel | null>({
    key: 'CreateEventStore',
    default: null,
})

const selectEventStore = atom<EventModel | null>({
    key: 'SelectEventStore',
    default: null
})

export {createEventStore, selectEventStore};