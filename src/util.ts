const date = new Date();

export function getMonth(month: number = date.getMonth()) {
  const year = date.getFullYear();
  
  const dayInTheWeekNumber = new Date(date.getFullYear(), month, 1).getDay();
  
  let currentMonthCount = dayInTheWeekNumber !== 0 
    ? 1 - dayInTheWeekNumber : -6;
  
  const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
  
  let countWeeks = Math.ceil((daysInMonth - currentMonthCount) / 7);

  const daysMatrix = new Array(countWeeks).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return new Date(year, month, currentMonthCount);
    })
  })
  
  return daysMatrix;
}

export function getWeekName(weekNumber: number) {
  switch(weekNumber) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
  }
}

export function formatDate(date: Date) {
  let dd = (date.getDate()).toString();
  if (Number(dd) < 10) {
    dd = '0' + dd;
  }

  let mm = (date.getMonth() + 1).toString();
  if (Number(mm) < 10) {
    mm = '0' + mm;
  }

  const yy = date.getFullYear();

  return dd + '.' + mm + '.' + yy;
}

export function getMonthName(month: number) {
  const mon = new Date(new Date().getFullYear(), month).getMonth();

  switch(mon) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
}

export function getMonthAndYear(month: number) {
  const mon = getMonthName(month);
  const year = (new Date(new Date().getFullYear(), month)).getFullYear();
  return  `${mon} ${year}`;
}

export function getMonthsFrom1970(date: Date) {
  return date.getFullYear() * 12 + date.getMonth() - 1970 * 12;
}