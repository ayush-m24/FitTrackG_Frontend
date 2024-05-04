import React, { useEffect, useState } from 'react';
import '../popup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AiFillDelete } from 'react-icons/ai';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface StepTrackPopupProps {
  setShowStepTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepTrackPopup: React.FC<StepTrackPopupProps> = ({ setShowStepTrackPopup }) => {
  const [date, setDate] = React.useState(dayjs());
  const [steps, setSteps] = React.useState('');
  const [stepEntries, setStepEntries] = useState([]);

  const fetchStepData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/steptrack/getstepsbydate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: formattedDate })
    }).then(res => res.json()).then(data => {
      if (data.ok) {
        setStepEntries(data.data);
      } else {
        toast.error('Error fetching step data');
      }
    }).catch(err => {
      toast.error('Network error');
    });
  };

  const saveStepData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/steptrack/addstepentry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: formattedDate, steps })
    }).then(res => res.json()).then(data => {
      if (data.ok) {
        toast.success('Step data added successfully');
        fetchStepData(); // Refresh data
      } else {
        toast.error('Error adding step data');
      }
    }).catch(err => {
      toast.error('Network error');
    });
  };

  const deleteStepEntry = async (item: any) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/steptrack/deletestepentry`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: item.date })
    }).then(res => res.json()).then(data => {
      if (data.ok) {
        toast.success('Step entry deleted successfully');
        fetchStepData(); // Refresh data
      } else {
        toast.error(data.message || 'Error in deleting step entry');
      }
    }).catch(err => {
      toast.error('Network error');
    });
  };

  useEffect(() => {
    fetchStepData(); // Initial data fetch
  }, []);

  const selectedDay = (val: any) => {
    setDate(val)
  };


  return (
    <div className='popupout'>
      <div className='popupbox'>
      <button className='close' onClick={() => setShowStepTrackPopup(false)}>
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
          label="Steps"
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <Button onClick={saveStepData}>Save</Button>

        <div className='hrline'></div>
        <div className='items'>
        {
        stepEntries.map((entry: any) => {
        return (
          <div className='item' key={entry._id}>
            <h3>{entry.date}: {entry.steps} steps</h3>
            <button onClick={() => deleteStepEntry(entry)}>
              <AiFillDelete />
            </button>
          </div>
        )
        })
        }
        </div>
      </div>
    </div>
  );
};

export default StepTrackPopup;
