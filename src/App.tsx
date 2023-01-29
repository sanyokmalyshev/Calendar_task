import { useState, useEffect } from 'react';
import './App.scss';
import { useAppSelector } from './app/hooks';
import CalendarHeader from './components/CalendarHeader';
import Month from './components/Month';
import { getMonth } from './util';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex } = useAppSelector((state) => state.calendar);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
    console.log(monthIndex);
  }, [monthIndex]);

  return (
    <div className="container mx-auto h-screen flex flex-col py-5 font-roboto">
      <CalendarHeader />
      <Month month={currentMonth} />
    </div>
  );
}

export default App;
