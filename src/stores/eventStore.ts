import { atom } from "recoil";
import { Donation, EventModel } from "../models/eventModel";

const createEventStore = atom<EventModel | null>({
    key: 'CreateEventStore',
    default: null,
})

const selectEventStore = atom<EventModel | null>({
    key: 'SelectEventStore',
    default: null
})

const selectDonationStore = atom<Donation | null>({
    key: 'SelectDonationStore',
    default: null
})

export {createEventStore, selectEventStore, selectDonationStore};