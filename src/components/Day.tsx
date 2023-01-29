import { getWeekName, formatDate } from '../util';
import { getMonthAndYear } from '../util';
import { useAppSelector } from "../app/hooks";

type Props = {
  day: Date;
}

export default function Day({ day }: Props) {
  const { monthIndex } = useAppSelector((state) => state.calendar);
  const firstNumber = new Date(getMonthAndYear(monthIndex));
  const lastNumber = new Date(firstNumber.getFullYear(), firstNumber.getMonth() + 1, 0);

  const firstNumberGetTime = firstNumber.getTime();
  const lastNumberGetTime = lastNumber.getTime();

  const getCurrentDayClass = () => {
    return formatDate(new Date()) === formatDate(day) ? 'bg-lime-200' : '';
  }

  const inactiveDaysClass = () => {
    if (day.getTime() < firstNumberGetTime || day.getTime() > lastNumberGetTime) {
      return 'bg-gray-100 opacity-80';
    }
  }
  return (
    <div className={`border border-gray-200 flex flex-row justify-between p-2 ${getCurrentDayClass()} ${inactiveDaysClass()}`}>
      <p className="text-sm">
        {day.getDate()}
      </p>
      <p className="text-sm">
        {getWeekName(day.getDay())}
      </p>
    </div>
  )
}
