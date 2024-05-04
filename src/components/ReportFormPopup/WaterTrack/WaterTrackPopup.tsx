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

interface WaterTrackPopupProps {
  setShowWaterTrackPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WaterTrackPopup: React.FC<WaterTrackPopupProps> = ({ setShowWaterTrackPopup }) => {
  const [date, setDate] = React.useState(dayjs());
  const [amount, setAmount] = React.useState('');
  const [waterEntries, setWaterEntries] = useState([]); // State to store water entries

  // Fetch water data
  const fetchWaterData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/watertrack/getwaterbydate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ date: formattedDate })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        setWaterEntries(data.data);
      } else {
        toast.error('Error fetching water data');
      }
    })
    .catch(err => {
      toast.error('Error with the network');
      console.error(err);
    });
  };

  const saveWaterData = async () => {
    const formattedDate = date.format('YYYY-MM-DD');
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/watertrack/addwaterentry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        date: formattedDate,
        amountInMilliliters: amount
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        toast.success('Water data added successfully');
        fetchWaterData(); // Fetch new data to update the list
      } else {
        toast.error('Error adding water data');
      }
    })
    .catch(err => {
      toast.error('Error with the network');
      console.error(err);
    });
  };

  const deleteWaterEntry = async (entry: { date: string | number | Date; }) => {
    const formattedDate = new Date(entry.date).toISOString().slice(0, 10); // Ensure date is in YYYY-MM-DD format

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/watertrack/deletewaterentry`, {
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
            toast.success('Water entry deleted successfully');
            fetchWaterData(); // Refresh the data shown in the popup
        } else {
            toast.error(data.message || 'Error in deleting water entry');
        }
    })
    .catch(err => {
        toast.error('Network error');
        console.error(err);
    });
};

  const selectedDay = (val: any) => {
    setDate(val);
    fetchWaterData(); // Fetch data for the selected date
  };

  useEffect(() => {
    fetchWaterData(); // Initial data fetch
  }, []);

  return (
    <div className='popupout'>
      <div className='popupbox'>
        <button className='close' onClick={() => setShowWaterTrackPopup(false)}>
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
          label="Amount in milliliters"
          type="number"
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={saveWaterData}>
          Save
        </Button>

        <div className='hrline'></div>
        <div className='items'>
          {waterEntries.map((entry: any) => (
            <div key={entry._id} className='item'>
              <h3>{entry.amountInMilliliters} ml on {dayjs(entry.date).format('YYYY-MM-DD')}</h3>
              <button onClick={() => deleteWaterEntry(entry)}>
                <AiFillDelete />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WaterTrackPopup;
