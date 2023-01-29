import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Event } from '../types/event';

function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

interface EventState {
  showEventModal: boolean,
  savedEvents: Event[],
  selectedEvent: Event | null,
  selectEventDay: string | null,
}

const initialState: EventState = {
  showEventModal: false,
  savedEvents: initEvents(),
  selectedEvent: null,
  selectEventDay: null,
}

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setShowEventModal: (state, action: PayloadAction<boolean>) => {
      state.showEventModal = action.payload;
    },
    setSavedEvents: (state, action: PayloadAction<Event>) => {
      state.savedEvents.push(action.payload);
    },
    updateSavedEvents: (state, action: PayloadAction<Event>) => {
      state.savedEvents = state.savedEvents.map(e => e.id === action.payload.id ? action.payload : e)
    },
    deleteEvent: (state, action: PayloadAction<Event>) => {
      state.savedEvents = state.savedEvents.filter(e => e.id !== action.payload.id)
    },
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload;
    },
    setEventDate: (state, action: PayloadAction<string | null>) => {
      state.selectEventDay = action.payload;
    }
  },
})

export const { setShowEventModal, setSavedEvents,  updateSavedEvents, deleteEvent, setSelectedEvent, setEventDate } = eventSlice.actions

export const selectEvents = (state: RootState) => state.events;

export default eventSlice.reducer;