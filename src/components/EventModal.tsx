import CloseIcon from '@mui/icons-material/Close';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setShowEventModal, setSavedEvents, setSelectedEvent, updateSavedEvents, deleteEvent, setEventDate } from '../features/eventSlice';
import { makeStyles } from '@mui/styles';
import TitleIcon from '@mui/icons-material/Title';
import { Unstable_DateField as DateField } from '@mui/x-date-pickers/DateField';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles(theme => ({
  disableBack: {
    backgroundColor: "#1565c0",
  },
  redBack: {
    backgroundColor: "#c62828",
  },
  focusOutline: {
    "& input": {
      paddingLeft: 0,
      backgroundColor: "transparent",
    },
    "& input:focus, textarea:focus": {
      outline: "none",
      borderColor: "transparent",
      boxShadow: "none",
      paddingLeft: 0,
    },
  },
}));

export default function EventModal() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { selectedEvent, selectEventDay } = useAppSelector((state) => state.events);

  const [title, setTitle] = useState(selectedEvent?.title ?? '');
  const [description, setDescription] = useState(selectedEvent?.description ?? '');
  const [time, setTime] = useState(selectedEvent?.time ?? '--:--');
  const [date, setDate] = useState<Dayjs | null>(
    selectedEvent 
      ? dayjs(selectedEvent.date) 
      : selectEventDay ? dayjs(selectEventDay) : dayjs()
  );
  const [dateError, setDateError] = useState(false);

 


  const handleCloseClick = () => {
    dispatch(setShowEventModal(false));
    dispatch(setSelectedEvent(null));
    dispatch(setEventDate(null));
  }

  const handleSubmit = () => {
    const id = selectedEvent ? selectedEvent.id : Date.now();

    if (!date) {
      return;
    }
  
    const calendarEvent = {
      id,
      title,
      description,
      date: date.toDate().toString(),
      time
    }

    if (selectedEvent) { 
      dispatch(updateSavedEvents({...calendarEvent, updated: Date.now()}));
    } else {
      dispatch(setSavedEvents(calendarEvent));
    }
    
    dispatch(setShowEventModal(false));
    dispatch(setSelectedEvent(null));
    dispatch(setEventDate(null));
  }

  function convertedDate(num: number) {
    if (!selectedEvent) {
      return;
    }
  
    const date = new Date(num);
    return dayjs(date).format('DD.MM.YYYY HH:mm')
  }

  function handeDelete() {
    if (!selectedEvent) {
      return;
    }
  
    dispatch(deleteEvent(selectedEvent));
    dispatch(setShowEventModal(false));
    dispatch(setSelectedEvent(null));
  }

  return (
    <div 
      className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-gray-500 bg-opacity-20" 
      onClick={handleCloseClick}
    >
      <form 
        className="bg-white shadow-2xl w-1/3"
        onClick={e => e.stopPropagation()}
      >
        <header className="bg-gray-100 px-4 py-2 flex items-center justify-between">
          <h2 className="font-bold text-gray-500">
            {!selectedEvent ? 'Add new idea item' : 'Edit event idea'}
          </h2>
          <IconButton onClick={handleCloseClick}>
            <CloseIcon color="action" fontSize="small" />
          </IconButton>
        </header>
        <div className='w-full p-4 pt-2 flex flex-col gap-3'>
          {selectedEvent && (
            <p className="text-sm text-gray-400">
              {!selectedEvent.updated && (
                `Created at: ${convertedDate(selectedEvent.id)}`
              )}
              {selectedEvent.updated && (
                `Updated at: ${convertedDate(selectedEvent.updated)}`
              )}
            </p>
          )}
          <TextField
            label="Title"
            required
            placeholder="Enter a Title"
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${classes.focusOutline} mr-0 w-full`}
            InputProps={{
              endAdornment: <InputAdornment position="start">
                <TitleIcon />
              </InputAdornment>,
            }}
          />
          <TextField
            label="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            variant="standard"
            className={`${classes.focusOutline} mr-0 w-full`}
          />
          <div className="flex justify-between items-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                variant="standard"
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                format="DD.MM.YYYY"
                className={`${classes.focusOutline} w-24`}
                onError={() => setDateError(!dateError)}
                required
              />
            </LocalizationProvider>
            <TextField
              variant="standard"
              label="Begin time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
              className={`${classes.focusOutline} w-24 h-full`}
            />
          </div>
          <div className="flex justify-end gap-3">
            {selectedEvent && (
              <Button 
                variant="contained" 
                color="error"
                className={`${classes.redBack} mr-0 w-1/5 mt-3`}
                onClick={() => handeDelete()}
              >
                <DeleteIcon />
              </Button>
            )}
            <Button variant="contained" 
              className={`${classes.disableBack} mr-0 w-1/2 mt-3`}
              onClick={handleSubmit}
              disabled={title === '' || dateError}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
