import { useState, useEffect } from 'react';
import './App.scss';
import { useAppSelector } from './app/hooks';
import CalendarHeader from './components/CalendarHeader';
import Month from './components/Month';
import { getMonth } from './util';
import EventModal from './components/EventModal';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex } = useAppSelector((state) => state.calendar);
  const { showEventModal } = useAppSelector((state) => state.events);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className="container mx-auto h-screen flex flex-col py-5 font-roboto">
        <CalendarHeader />
        <Month month={currentMonth} />
      </div>
      {showEventModal && <EventModal />}
    </>
  );
}

export default App;
