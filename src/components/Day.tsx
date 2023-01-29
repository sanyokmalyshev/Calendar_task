import { getWeekName, formatDate } from '../util';
import { getMonthAndYear } from '../util';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useState, useEffect } from 'react';
import { Event } from '../types/event';
import { setEventDate, setSelectedEvent, setShowEventModal } from '../features/eventSlice';

type Props = {
  day: Date;
}

export default function Day({ day }: Props) {
  const dispatch = useAppDispatch();
  const { monthIndex } = useAppSelector((state) => state.calendar);
  const { savedEvents } = useAppSelector((state) => state.events);
  
  const [dayEvents, setDayEvents] = useState<Event[]>([]);

  useEffect(() => {
    const events: Event[] = savedEvents.filter(e =>
       day.toLocaleDateString("en-US") === 
       new Date(e.date).toLocaleDateString("en-US"));

    setDayEvents(events)
  }, [savedEvents, day])

  const getCurrentDayClass = () => {
    return formatDate(new Date()) === formatDate(day) 
      ? 'bg-blue text-white hover:bg-blue' : '';
  }

  const inactiveDaysClass = () => {
    const firstNumber = new Date(getMonthAndYear(monthIndex));
    const lastNumber = new Date(firstNumber.getFullYear(), firstNumber.getMonth() + 1, 0);

    const firstNumberGetTime = firstNumber.getTime();
    const lastNumberGetTime = lastNumber.getTime();

    if (day.getTime() < firstNumberGetTime || day.getTime() > lastNumberGetTime) {
      return 'bg-gray-50 text-gray-500';
    }
  }

  const handleClick = (evt: Event) => {
    dispatch(setSelectedEvent(evt))
    dispatch(setShowEventModal(true))
  }

  const selectDate = () => {
    dispatch(setEventDate(day.toString()))
    dispatch(setShowEventModal(true))
  }

  return (
    <div 
      className={`border-b border-r border-gray-200 flex flex-col  p-2 gap-1 cursor-pointer hover:bg-gray-100 ${getCurrentDayClass()} ${inactiveDaysClass()}`}
      onClick={() => selectDate()}
    >
      <div className='flex justify-between w-full'>
        <p className="text-sm">
          {day.getDate()}
        </p>
        <p className="text-sm">
          {getWeekName(day.getDay())}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {dayEvents.map(evt => (
          <div 
            key={evt.id} 
            className={`bg-gray-400 rounded px-2 text-white truncate cursor-pointer text-sm `}
            onClick={() => handleClick(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  )
}
