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

interface SleepTrackPopupProps {
  setShowSleepTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SleepTrackPopup: React.FC<SleepTrackPopupProps> = ({ setShowSleepTrackPopup }) => {
  const [date, setDate] = React.useState(dayjs());
  const [duration, setDuration] = React.useState('');
  const [sleepEntries, setSleepEntries] = useState([]); // State to store sleep entries

  // Fetch sleep data
  const fetchSleepData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/getsleepbydate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: formattedDate })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        setSleepEntries(data.data);
      } else {
        toast.error('Error fetching sleep data');
      }
    })
    .catch(err => {
      toast.error('Error with the network');
      console.error(err);
    });
  };

  const saveSleepData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/addsleepentry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        date: formattedDate,
        durationInHrs: duration
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        toast.success('Sleep data added successfully');
      } else {
        toast.error('Error adding sleep data');
      }
    })
    .catch(err => {
      toast.error('Error with the network');
      console.error(err);
    });
  };

  const deleteSleepEntry = async (item: { date: string | number | Date; }) => {
    const formattedDate = new Date(item.date).toISOString().slice(0, 10); // Ensure date is in YYYY-MM-DD format

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/deletesleepentry`, {
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
            toast.success('Sleep entry deleted successfully');
            // Refresh the data shown in the popup or close the popup
        } else {
            toast.error(data.message || 'Error in deleting sleep entry');
        }
    })
    .catch(err => {
        toast.error('Network error');
        console.error(err);
    });
};


  const selectedDay = (val: any) => {
    setDate(val)
    fetchSleepData();
  };

  useEffect(() => {
    fetchSleepData(); // Initial data fetch
  }, [date]);

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close' onClick={() => setShowSleepTrackPopup(false)}>
          <IoIosCloseCircleOutline />
        </button>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
             label="Select Date"
             value={date}
             onChange={(newValue: any) => {
              selectedDay(newValue)
             }}
            />
         </LocalizationProvider>
        <TextField
          label="Duration in hours"
          type="number"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={saveSleepData}>
          Save
        </Button>


        <div className='hrline'></div>
        <div className='items'>
          {
          sleepEntries.map((entry: any) => (
            <div key={entry._id} className='item'>
              <h3>{entry.durationInHrs} hours on {dayjs(entry.date).format('YYYY-MM-DD')}</h3>
              <button onClick={() => deleteSleepEntry(entry)}>
                <AiFillDelete />
              </button>
            </div>
          )
          )
          }
        </div>


      </div>
    </div>
  );
};

export default SleepTrackPopup;
