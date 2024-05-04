import React, { useEffect, useState } from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AiFillDelete } from 'react-icons/ai';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface WorkoutTrackPopupProps {
  setShowWorkoutTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkoutTrackPopup: React.FC<WorkoutTrackPopupProps> = ({ setShowWorkoutTrackPopup }) => {
  const [date, setDate] = React.useState(dayjs());
  const [duration, setDuration] = React.useState('');
  const [type, setType] = React.useState('');
  const [workoutEntries, setWorkoutEntries] = useState([]); // State to store workout entries

  // Fetch workout data
  const fetchWorkoutData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workouttrack/getworkoutsbydate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: formattedDate })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        setWorkoutEntries(data.data);
      } else {
        toast.error('Error fetching workout data');
      }
    })
    .catch(err => {
      toast.error('Error with the network');
      console.error(err);
    });
  };

  const saveWorkoutData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workouttrack/addworkoutentry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        date: formattedDate,
        exercise: type,  // Changed from type to exercise
        durationInMinutes: duration  // Changed from duration to durationInMinutes
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        toast.success('Workout data added successfully');
        fetchWorkoutData(); // Refresh data to update the list
      } else {
        toast.error('Error adding workout data: ' + data.message);
      }
    })
    .catch(err => {
      toast.error('Error with the network');
      console.error(err);
    });
  };

  const deleteWorkoutEntry = async (entry: { date: string | number | Date; }) => {
    const formattedDate = new Date(entry.date).toISOString().slice(0, 10); // Ensure date is in YYYY-MM-DD format

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workouttrack/deleteworkoutentry`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            date: formattedDate
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            toast.success('Workout entry deleted successfully');
            fetchWorkoutData(); // Refresh the data shown in the popup
        } else {
            toast.error(data.message || 'Error in deleting workout entry');
        }
    })
    .catch(err => {
        toast.error('Network error');
        console.error(err);
    });
};

  const selectedDay = (val: any) => {
    setDate(val);
    fetchWorkoutData(); // Fetch data for the selected date
  };

  useEffect(() => {
    fetchWorkoutData(); // Initial data fetch
  }, []);

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close' onClick={() => setShowWorkoutTrackPopup(false)}>
          <IoIosCloseCircleOutline />
        </button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
             label="Select Date"
             value={date}
             onChange={(newValue: any) => {
              selectedDay(newValue);
             }}
            />
         </LocalizationProvider>
        <TextField
          label="Duration in minutes"
          type="number"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <TextField
          label="Type of workout"
          variant="outlined"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={saveWorkoutData}>
          Save
        </Button>

        <div className='hrline'></div>
        <div className='items'>
          {workoutEntries.map((entry: any) => (
            <div key={entry._id} className='item'>
              <h3>{entry.duration} minutes of {entry.type} on {dayjs(entry.date).format('YYYY-MM-DD')}</h3>
              <button onClick={() => deleteWorkoutEntry(entry)}>
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WorkoutTrackPopup;
