import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { withStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getMonthAndYear, getMonthsFrom1970 } from '../util';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setMonthIndex} from '../features/calendarSlice';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddToolTip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "green",
  }
})(Tooltip);

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B7280',
    },
  },
});

export default function CalendarHeader() {
  const { monthIndex } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [value, setValue] = useState<Date | undefined>(new Date(getMonthAndYear(monthIndex)));

  useEffect(() => {
    setValue(new Date(getMonthAndYear(monthIndex)));
  }, [monthIndex]);


  function handleReset() {
    dispatch(setMonthIndex(new Date().getMonth()));
  }

  function handleChange(newValue: Dayjs | null) {
    const checkedDate = newValue?.startOf('M').toDate();
    setValue(checkedDate);

    if (checkedDate) {
      const nowDate = new Date(getMonthAndYear(monthIndex));

      const checkedMonthsFrom1970 = getMonthsFrom1970(checkedDate);
      const nowMonthsfrom1970 = getMonthsFrom1970(nowDate);

      dispatch(setMonthIndex(monthIndex + checkedMonthsFrom1970 - nowMonthsfrom1970));
    }
  }

  return (
    <header className="flex justify-between items-center">
      <AddToolTip 
        TransitionComponent={Zoom} 
        title="Add new idea" 
      >
        <IconButton>
          <AddCircleRoundedIcon color="success" fontSize="large" />
        </IconButton>
      </AddToolTip>
      <div className='flex items-center'>
        <ThemeProvider theme={theme}>
          <Button 
            variant="outlined" 
            onClick={handleReset}
          >
            Today
          </Button>
        </ThemeProvider>
        <div className='flex items-center mx-2'>
          <IconButton 
            onClick={() => dispatch(setMonthIndex(monthIndex - 1))}
          >
            <ArrowBackIosNewIcon 
              fontSize="small" 
              className="text-gray-500" 
              
            />
          </IconButton>
          <p className="font-bold text-gray-500 w-32 text-center">{getMonthAndYear(monthIndex)}</p>
          <IconButton
            onClick={() => dispatch(setMonthIndex(monthIndex + 1))}
          >
            <ArrowForwardIosIcon 
              fontSize="small" 
              className="text-gray-500"
            />
          </IconButton>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            open={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            views={['year', 'month']}
            label="Year and Month"
            value={dayjs(value)}
            onChange={(newValue) => handleChange(newValue)}
            renderInput={(params) => (
              <div>
                <TextField style={{ opacity: 0, width: 0, height: 0 }} {...params} /> 
                <ThemeProvider theme={theme}>
                  <Button
                    className="p-1"
                    variant="outlined"
                    onClick={() => setCalendarOpen((calendarOpen) => !calendarOpen)}>
                    <CalendarTodayIcon />
                  </Button>
                </ThemeProvider>
              </div>
            )}
          />
        </LocalizationProvider>
      </div>
    </header>
  )
}
