"use client"
import React from 'react'
import './ReportPage.css'
import { LineChart } from '@mui/x-charts/LineChart';
import { AiFillEdit } from 'react-icons/ai' //edit icon button
import CaloriIntakePopup from '@/components/ReportFormPopup/CalorieIntake/CalorieIntakePopup';
import { usePathname } from 'next/navigation'; //To get the pathname of the redirected page
import SleepTrackPopup from '@/components/ReportFormPopup/SleepTrack/SleepTrackPopup';
import StepTrackPopup from '@/components/ReportFormPopup/StepTrack/StepTrackPopup'; 
import WaterTrackPopup from '@/components/ReportFormPopup/WaterTrack/WaterTrackPopup'; 
import WorkoutTrackPopup from '@/components/ReportFormPopup/WorkoutTrack/WorkoutTrackPopup';

const Page = () => {
  const color = 'rgb(255, 255, 255)';
  const pathname = usePathname();
console.log(pathname)

  const chartsParams = {
    height: 300,
    width: 500,
  };

  //Hook used to store the chart data
  const [dataS1, setDataS1] = React.useState<any>(null);

  //Function to fetch and process the data for the chart
  const getDataForS1 = async () => {

      if (pathname == '/report/Calorie%20Intake') {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/calorieintake/getcalorieintakebylimit', {
          method: 'POST', //POSt request created
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({limit: 10 })
        })

        .then(res => res.json())
        .then(data => {
            if (data.ok) { //Map the data to the chart
                let temp = data.data.map((item: any) => {
                  return {
                    date: item.date,
                    value: item.calorieIntake,
                    unit: 'kcal'
                  }
                })

                let dataForLineChart = temp.map((item: any) => {
                  let val = JSON.stringify(item.value)
                  return val
                })

                let dataForXAxis = temp.map((item: any) => {
                  let val = new Date(item.date)
                  return val
                })

                //console.log(data.data) //To check the data for graph 

                setDataS1({
                  data: dataForLineChart,
                  title: '1 Day Calorie Intake',
                  color: color,
                  xAxis: {
                    data: dataForXAxis,
                    label: 'Last 10 Days',
                    scaleType: 'time'
                  }
                })

        }
          else {
            setDataS1([]) //Else set empty chart
          }
        })
        .catch(err => {
          console.log(err)
        })

      }

      else if (pathname.includes('Sleep')) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sleeptrack/getsleepbylimit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ limit: 10 })
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            const chartData = data.data.map((item: any) => ({
              date: new Date(item.date),
              value: item.durationInHrs,
              unit: 'hrs'
            }));
            setDataS1({
              data: chartData.map((item: { value: any; }) => item.value),
              title: 'Sleep Over Last 10 Days',
              color: color,
              xAxis: {
                data: chartData.map((item: { date: any; }) => item.date),
                label: 'Last 10 Days',
                scaleType: 'time'
              }
            });
          } else {
            setDataS1([]);
          }
        })
        .catch(err => {
          console.error(err);
          setDataS1([]);
        });
      }

      else if (pathname.includes('Steps')) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/steptrack/getstepsbylimit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ limit: 10 })
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            const chartData = data.data.map((item: any) => ({
              date: new Date(item.date),
              value: item.steps,  // Assuming 'steps' is the key where step count is stored
              unit: 'steps'
            }));
            setDataS1({
              data: chartData.map((item: { value: any; }) => item.value),
              title: 'Steps Over Last 10 Days',
              color: color,
              xAxis: {
                data: chartData.map((item: { date: any; }) => item.date),
                label: 'Last 10 Days',
                scaleType: 'time'
              }
            });
          } else {
            setDataS1([]);
          }
        })
        .catch(err => {
          console.error(err);
          setDataS1([]);
        });
      }


      else if (pathname.includes('Water')) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/watertrack/getwaterbylimit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ limit: 10 })
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            const chartData = data.data.map((item: any) => ({
              date: new Date(item.date),
              value: item.amount,  // Assuming 'amount' is the key where water intake in milliliters is stored
              unit: 'ml'
            }));
            setDataS1({
              data: chartData.map((item: { value: any; }) => item.value),
              title: 'Water Intake Over Last 10 Days',
              color: color,
              xAxis: {
                data: chartData.map((item: { date: any; }) => item.date),
                label: 'Last 10 Days',
                scaleType: 'time'
              }
            });
          } else {
            setDataS1([]);
          }
        })
        .catch(err => {
          console.error(err);
          setDataS1([]);
        });
      }
      
      else if (pathname.includes('Workout')) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workouttrack/getworkoutbylimit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ limit: 10 })
        })
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            const chartData = data.data.map((item: any) => ({
              date: new Date(item.date),
              value: item.duration,
              unit: 'mins'
            }));
            setDataS1({
              data: chartData.map((item: { value: any; }) => item.value),
              title: 'Workout Duration Over Last 10 Days',
              color: color,
              xAxis: {
                data: chartData.map((item: { date: any; }) => item.date),
                label: 'Last 10 Days',
                scaleType: 'time'
              }
            });
          } else {
            setDataS1([]);
          }
        })
        .catch(err => {
          console.error(err);
          setDataS1([]);
        });
      }
      
    

      else {
        alert('Get data for other reports')
      }

    ////Assuming that this is the kind of data that will be fetched. Sample data
   /* let temp = [
      { date: 'Mon Apr 22 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2000, unit: 'kcal' },
      { date: 'Sun Apr 21 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2500, unit: 'kcal' },
      { date: 'Sat Apr 20 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2700, unit: 'kcal' },
      { date: 'Fri Apr 19 2024 14:00:53 GMT+0100 (British Summer Time)', value: 3000, unit: 'kcal' },
      { date: 'Thu Apr 18 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2000, unit: 'kcal' },
      { date: 'Wed Apr 17 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2300, unit: 'kcal' },
      { date: 'Tue Apr 16 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2500, unit: 'kcal' },
      { date: 'Mon Apr 15 2024 14:00:53 GMT+0100 (British Summer Time)', value: 2700, unit: 'kcal' },
    ];

    //Variable declared `dataForLineChart` and assign it the result of mapping over the `temp` array.
    let dataForLineChart = temp.map(item => item.value);
    
    //Similar to the above but for the xaxis that shows the date.
    let dataForXAxis = temp.map(item => new Date(item.date));

    //To check the exact data being shown
    console.log({
      data: dataForLineChart,
      title: '1 Day Calorie Intake',
      color: color,
      xAxis: {
          data: dataForXAxis,
          label: 'Last 10 Days',
          scaleType: 'time'
      }
  }) 

    setDataS1({
      data: dataForLineChart,
      title: '1 Day Calorie Intake',
      color: color, //Color for the chart
      xAxis: { //Data for xaxis
          data: dataForXAxis,
          label: 'Last 10 Days',
          scaleType: 'time' //Since date is being used and it is in object format
      }
    }); */
  }

  //Effect hook to fetch data on component mount
  React.useEffect(() => {
    getDataForS1();
  }, []); //Empty dependency array to ensure it runs only once

  //Hook created for the edit popup button
  const [showCalorieIntakePopup, setShowCalorieIntakePopup] = React.useState<boolean>(false);
  const [showSleepTrackPopup, setShowSleepTrackPopup] = React.useState<boolean>(false);
  const [showStepTrackPopup, setShowStepTrackPopup] = React.useState<boolean>(false);
  const [showWaterTrackPopup, setShowWaterTrackPopup] = React.useState<boolean>(false);
  const [showWorkoutTrackPopup, setShowWorkoutTrackPopup] = React.useState<boolean>(false);



  return (
    <div className='reportpage'>
     
        <div className='s1'>
        {dataS1 && dataS1.xAxis && dataS1.xAxis.data && ( //If dataS1 is not empty then show the chart below
        <LineChart
          xAxis={[{ //Defines what goes in the xaxis below
            id: 'Day',
            data: dataS1.xAxis.data, //Assigns data for the xaxis from the `dataS1.xAxis.data` property.
            scaleType: dataS1.xAxis.scaleType, //Sets the scale type for the xaxis using the `scaleType` from `dataS1.xAxis`.
            label: dataS1.xAxis.label, //Defines a label for the xaxis sourced from `dataS1.xAxis.label`.
            valueFormatter: (date) => date.getDate().toString(), //Returns the day of the month from a date object
          }]}
          series={[{
            data: dataS1.data,
            label: dataS1.title,
            color: dataS1.color,
          }]}
          {...chartsParams} //Uses the parameters set in "chartsParams" above
        />
      )}
         </div>

         <button className='editbutton'
              onClick={() => {
                if (pathname == '/report/Calorie%20Intake') { //Only show popup for calorieintake if pathname is...
                setShowCalorieIntakePopup(true) 
                }
                else if (pathname == '/report/Sleep') { //Only show popup for calorieintake if pathname is...
                  setShowSleepTrackPopup(true) 
                  }
                  else if (pathname == '/report/Steps') {
                    setShowStepTrackPopup(true);
                  }
                  else if (pathname == '/report/Water') {
                    setShowWaterTrackPopup(true);
                  }
                  else if (pathname.includes('Workout')) {
                    setShowWorkoutTrackPopup(true); 
                  }
                  
                else {
                  //Show popup for other reports
                  alert('show popup for other reports')
                }
            }}  
         > 
             <AiFillEdit />
         </button>
         
            {
                showCalorieIntakePopup &&
                <CaloriIntakePopup setShowCalorieIntakePopup={setShowCalorieIntakePopup} />
            }


            {
            showSleepTrackPopup && 
            <SleepTrackPopup setShowSleepTrackPopup={setShowSleepTrackPopup} />
            }

            {
              showStepTrackPopup &&
              <StepTrackPopup setShowStepTrackPopup={setShowStepTrackPopup} />
            }

            {
              showWaterTrackPopup &&
              <WaterTrackPopup setShowWaterTrackPopup={setShowWaterTrackPopup} />
            }

            {
            showWorkoutTrackPopup && 
            <WorkoutTrackPopup setShowWorkoutTrackPopup={setShowWorkoutTrackPopup} />
            }



    </div>
  );
}

export default Page;



