"use client"
import React from 'react'
import './workoutPage.css'

const page = () => {
    //hook for storing the workout from the backend
    const [workout, setWorkout] = React.useState<any>(null)

    const getworkout = async () => {
        let data: any = {
            //For when user clicks on "Chest" in the home page they will see the below
            type: 'Chest',
            imageUrl: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlc3QlMjB3b3Jrb3V0fGVufDB8fDB8fHww',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Cable Chest Fly',
                    videoUrl: 'https://gymvisual.com/img/p/2/1/5/2/3/21523.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Use cable machine to target the pectorals.'
                },

                {
                    exercise: 'Barbell Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'On a flat bench press weigh upwards using a barbell'

                },

                {
                    exercise: 'Chest Dip',
                    videoUrl: 'https://gymvisual.com/img/p/4/9/8/4/4984.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lower your body between two “dip bars” and press yourself upward again'

                }

            ]
        }
        setWorkout(data)
    }
    //function called when the page is loaded
    React.useEffect(() => {
        getworkout()
    }, [])

  return (
    <div className='workout'>
       <h1 className='mainhead1'> {workout?.type} Day</h1> 
       <div className='workout__exercises'> 
            {
                //the exercises will be mapped 
               workout?.exercises.map((item: any, index: number)=> {
                return (
                    <div className={
                        //If the card index number is odd it will be shown on the right with the same styles as the left (hence the reverse)
                        //If remainder of index divided by 2 is 0 then show the card on the left
                        index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'
                    }>
                        
                       <h3>{index+1}</h3> 
                                <div className='workout__exercise__image'>
                                    <img src={item.videoUrl} alt="" />
                                </div>
                                <div className='workout__exercise__content'>
                                    <h2>{item.exercise}</h2>
                                    <span>{item.sets} sets X {item.reps} reps</span>
                                    <p>{item.description}</p>
                                </div> 
                    </div>
                )

               })
            }
       </div>

    </div>
  )
}

export default page

/* Line 67
To display the exercises as "1, 2, 3, ..." instead of "0, 1, 2, ...", use of index+1. */