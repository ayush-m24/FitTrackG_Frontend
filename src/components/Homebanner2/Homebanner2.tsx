import React from 'react'
import './Homebanner2.css'
//Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Homebanner2 = () => {
  //Workouts set using the functions below. Array of any type of object passed. 
  const [workouts, setWorkouts] = React.useState<any[] | null>(null)

  //const [data, setData] = React.useState<any[] | null>(null)
  //function to get fata from the backend.
  const getworkouts = async () => {
    let data: any = [
      {
        type: 'Chest',
        imageUrl: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlc3QlMjB3b3Jrb3V0fGVufDB8fDB8fHww',
        durationInMin: 40
      },
      {
        type: 'Abs',
        imageUrl: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFicyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D',
        durationInMin: 30
      },
      {
        type: 'Shoulder',
        imageUrl: 'https://images.unsplash.com/photo-1704223523204-504405c9331a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHNob3VsZGVyJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D',
        durationInMin: 40
      },
      {
        type: 'Back',
        imageUrl: 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvdWxkZXIlMjB3b3Jrb3V0fGVufDB8fDB8fHww'
      },
      {
        type: 'Biceps',
        imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljZXBzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D',
        durationInMin: 50
      },
      {
        type: 'Triceps',
        imageUrl: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJpY2VwcyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D',
        durationInMin: 30
      },

      {
        type: 'Legs',
        imageUrl: 'https://images.unsplash.com/photo-1646495001290-39103b31873a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGxlZ3MlMjB3b3Jrb3V0fGVufDB8fDB8fHww',
        durationInMin: 80
      },

      {
        type: 'Cardio',
        imageUrl: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRyZWFkbWlsbHxlbnwwfHwwfHx8MA%3D%3D',
        durationInMin: 80
      },
      {
        type: 'Forearms',
        imageUrl: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a34e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZWFybXN8ZW58MHx8MHx8fDA%3D',
        durationInMin: 25
      }
    ]
    setWorkouts(data)
  }

  //It will be called whenever the above component is loaded
  React.useEffect(() => {
    getworkouts()
  }, [])

 /* const getData =async () => {

    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutplans/workouts', {
      method: 'GET', 
      credentials: 'include',
    })

    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.ok) {
        setData(data.data)
      }
      else {
        setData([])
      }
    })
    .catch(err => {
      console.log(err)
      setData([])
    })
    
  } */

   /* //It will be alled whenever the above component is loaded
    React.useEffect(() => {
      getData()
    }, []) */

  return (
    
      <>
      
          <div>
      <h1 className='mainhead1'>Workouts</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
    
        {
//Data being mapped inside swiper slide to showcase each workout
          workouts && workouts.map((item, index) => {
            return (
              <SwiperSlide key={index} >
                <div className='swiper-slide' //Div with the workout image
                   style={{
                      backgroundImage: `url(${item.imageUrl})`,
                    }}
                    onClick={() => {
                      window.location.href = `/workout/${item.type}` //the type indicates the workout type which the user will click on amd be redirected to
                    }}
                  > 
                    <div className='swiper-slide-content'> 
                      <h2>{item.type}</h2>
                      <p>{item.durationInMin} min</p>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }

      </Swiper>
    </div>

      
      </>
  )
}


export default Homebanner2