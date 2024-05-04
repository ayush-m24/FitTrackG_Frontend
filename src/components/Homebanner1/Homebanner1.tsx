//Homebanner 1 will have the progress report 
import React from 'react'
import CircularProgress from '@mui/joy/CircularProgress';
import { AiOutlineEye } from 'react-icons/ai'
import './HomeBanner1.css'


const Homebanner1 = () => {
  
  //Receive data from backend
  const [data, setData] = React.useState<any>(null)
  //Asynchronous arrow function to getData based on the user logged in
  const getData = async () => {
    let temp = [
      {
        "name": "Calories Intake",
        "value": 2000,
        "unit": "kcal",
        "goal": 2500,
        "goalUnit": "kcal"
      },
      {
        "name": "Sleep",
        "value": 6,
        "unit": "hrs",
        "goal": 8,
        "goalUnit": "hrs"
      },
      {
        "name": "Steps",
        "value": 50,
        "unit": "steps",
        "goal": 10000,
        "goalUnit": "steps"
      },
      {
        "name": "Water",
        "value": 2000,
        "unit": "ml",
        "goal": 3000,
        "goalUnit": "ml"
      },
      {
        "name": "Weight",
        "value": 75,
        "unit": "kg",
        "goal": 70,
        "goalUnit": "kg"
      },
      {
        "name": "Workout",
        "value": 2,
        "unit": "days",
        "goal": 6,
        "goalUnit": "days"
      }
    ]
    setData(temp)
    console.log(temp) 
  
    //Function to call data from the backend for the reports data. 
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/report/getreport', {
      method: 'GET',
      credentials: 'include',
    })

    .then(res => res.json())
    .then(data => {
      console.log(data) 
      if (data.ok) {  //Data is printed after the fetch function is called and executed successfully
        setData(data.data)
      }
      else (
        setData(temp)
      )
    })
    .catch(err => {
      console.log(err)
      setData([])
    })

  }


  //Get data whenevr the component loads
  React.useEffect(() => {
    getData()
  }, []) 

  /* //Function created to get fractions as a ratio to show user in  CircularProgress
 function simplifyFraction(numerator: number, denominator: number): [number, number] {
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }
    const commonDivisor: number = gcd(numerator, denominator);

    // Simplify the fraction
    const simplifiedNumerator: number = numerator / commonDivisor;
    const simplifiedDenominator: number = denominator / commonDivisor;
    //gives out the smallest numbers for each
    return [simplifiedNumerator, simplifiedDenominator];

  }
 */




  return (
    <div className='meters'>
      {
        //if data exists (not null) and >0 then the component will be shown and data will be mapped
      data?.length >0 && data.map((item: any, index: number) => {
        return (
          <div className='card' key={index}>
          <div className='card-header'>
                <div className='card-header-box'>
                  <div className='card-header-box-name'>{item.name}</div> 
                  <div className='card-header-box-value'>{parseInt(item.value)} {item.unit}</div> 
                </div>
                <div className='card-header-box'>
                  <div className='card-header-box-name'>Target</div>
                  <div className='card-header-box-value'>{parseInt(item.goal)} {item.goalUnit}</div>
                </div>
          </div>

          <CircularProgress
            color="neutral"
            determinate
            variant="outlined"
            size='lg'
            value={
              (item.value / item.goal) * 100 //The value shown will be based on how much the user has achieved in regards to their goal (the % completed)
            }
          > 
           <div className='textincircle'>
                  
                  <span>{
                    
                    parseInt(item.value)
                  }</span>

                  <span className='hrline'></span>

                  <span>{
                    
                    parseInt(item.goal)
                  }</span>

            </div>
          </CircularProgress>
          
          <button
          onClick={() => {
            window.location.href = `/report/${item.name}` //When user clicks on Show report they will be redirected to the report page for the item.name, the cards value (i.e sleep, steps and others mentioned above)
          }}
          >Show Report <AiOutlineEye/></button> 

         </div>
        )
      }) 
      }
      </div>
  )
}

export default Homebanner1