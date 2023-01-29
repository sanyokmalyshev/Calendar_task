import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { getMonthAndYear, getMonthsFrom1970 } from '../util';

function initSelectedDate() {
  const currentDate = localStorage.getItem('currentDate');
  const parsedDate = currentDate ? JSON.parse(currentDate) : new Date().toString();
  
  return parsedDate;
}

function initMonthIndex() {
  const month = new Date().getMonth();
  const checkedDate = new Date(initSelectedDate());

  const nowDate = new Date(getMonthAndYear(month));

  const checkedMonthsFrom1970 = getMonthsFrom1970(checkedDate);
  const nowMonthsfrom1970 = getMonthsFrom1970(nowDate);

  return month + checkedMonthsFrom1970 - nowMonthsfrom1970;
}

interface CalendarState {
  monthIndex: number,
  selectedDate: string,
}

const initialState: CalendarState = {
  monthIndex: initMonthIndex(),
  selectedDate: initSelectedDate(),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthIndex: (state, action: PayloadAction<number>) => {
      state.monthIndex = action.payload
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
})


export const { setMonthIndex, setSelectedDate } = calendarSlice.actions

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;