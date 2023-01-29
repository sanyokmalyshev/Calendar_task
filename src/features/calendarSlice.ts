import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface CalendarState {
  monthIndex: number
}

const initialState: CalendarState = {
  monthIndex: new Date().getMonth(),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthIndex: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload
    },
  },
})

export const { setMonthIndex } = calendarSlice.actions

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;