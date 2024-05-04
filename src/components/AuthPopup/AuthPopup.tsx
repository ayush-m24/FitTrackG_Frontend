import React, { useState } from 'react'
import './AuthPopup.css' 
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Input from '@mui/joy/Input'; //Input field for the form
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { IoIosCloseCircleOutline } from "react-icons/io";
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ToastContainer, toast } from 'react-toastify';

//Defines an interface `AuthPopupProps` for the `AuthPopup` component, specifying that it requires a `setShowpopup` function prop to control its visibility.
interface AuthPopupProps {
    setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}

//Interface created for signup form data. Type for each value defined.
interface SignupFormData {
    name: String | null,
    email: String | null,
    password: String | null,
    weightInKg: Number | null,
    heightInCm: Number | null,
    goal: String | null,
    gender: String | null,
    dob: Date | null,
    activityLevel: String | null
}


//Defines a functional React component `AuthPopup` that accepts props of type `AuthPopupProps`. This component can manipulate its visibility state using `setShowpopup`, a function provided via props.
const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
   
    //if signup is clicked then to show the Signup  popup
    const [showSignup, setShowSignup] = React.useState<boolean>(false)

    //The data that will be taken in signup
    //Initialize 'signupformData' state with default values using React's useState hook for managing form data in a signup form. 
    const [signupformData, setSignupFormData] = useState<SignupFormData>({
        name: '', //This state includes fields for user's name, email, password, weight (in kilograms), height (in centimeters), fitness goal, gender, date of birth, and activity level, all set to initial default values.
        email: '',
        password: '',
        weightInKg: 0.0,
        heightInCm: 0.0,
        goal: '',
        gender: '',
        dob: new Date(),
        activityLevel: ''
    })

    const [loginformData, setLoginFormData] = useState({
        email: '',
        password: '',
    })


    //Function intended to be called when a user submits their login details.
    const handleLogin = () => {
        //Logs the current state of login form data to the console for debugging.
        console.log(loginformData);
    
        //Initiates a fetch request to the server endpoint for login, using environment variables to get the API URL.
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
            method: 'POST', //Specifies that this is a POST request.
            headers: {
                'Content-Type': 'application/json' //Sets header to inform server that the request body format is JSON.
            },
            body: JSON.stringify(loginformData), //Converts the login form data into a JSON string for sending in the request body.
            credentials: 'include' //Ensures that credentials such as cookies are included in the request
        })
        .then(res => res.json()) //Parses the JSON response from the server to a JavaScript object.
            .then(data => {
                //Logs the response data to the console for debugging.
                console.log(data);
    
                //Check if the server responded with a success message (data.ok is true).
                if (data.ok) {
                    toast.success(data.message) //Displays a success toast notification with the message from the server.
    
                    setShowpopup(false) //Hides the login popup/dialog if the login was successful.
                }
                else {
                    toast.error(data.message) //Displays an error toast notification if the server response indicates a failure.
                }
            }).catch(err => {
                //Logs any errors that occur during the fetch operation to the console.
                console.log(err);
            })
    }

    const handleSignup = () => {
    
     /*   
    // Logs the API base URL to the console to verify it's being read correctly.
    console.log('API URL:', process.env.NEXT_PUBLIC_BACKEND_API);

    // Constructs the full request URL and logs it to ensure it's correct.
    const requestUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`;
    console.log('Full request URL:', requestUrl);

    // Logs the form data to be sent with the request.
    console.log('Form Data:', loginformData);
    */
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupformData),
            credentials: 'include'
        })
            .then(res => res.json()) //If data is ok then convert to JSON format
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)

                    setShowSignup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }

  return (
    <div className='popup'>
          <button className='close'
                onClick={() => {
                    setShowpopup(false)
                }}
            >
                <IoIosCloseCircleOutline />
            </button>
        {
            showSignup ? ( 
                <div> 
                    <div className='authform'>  
                    <div className='left'>
                        <Image src={logo} alt='Logo' />
                    </div>
                    <div className='right'>
                        <h1>Signup to start tracking!</h1>
                        <form action=''>

                        <Input
                                    color="neutral"
                                    placeholder="name"
                                    size="lg"
                                    variant="outlined"
                                    onChange={(e) => { //Event handler that captures and handles changes made to the input field.
                                        setSignupFormData({
                                             //his function updates the signup form data state by spreading the existing fields and updating the 'name' field with the new value entered by the user.
                                            ...signupformData,
                                            name: e.target.value //e.target.value: Contains the current textual content of the <Input> field, which is the user's input.
                                        })
                                    }}
                                />
                                <Input
                                    color="neutral"
                                    placeholder="email"
                                    size="lg"
                                    variant="outlined"

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            email: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    color="neutral"
                                    placeholder="password"
                                    size="lg"
                                    variant="outlined"
                                    type='password'

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            password: e.target.value
                                        })
                                    }}
                                />
                          
                                <Input 
                                    color="neutral" 
                                    size="lg" variant="outlined" 
                                    type="number" placeholder='Weight in kg'

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            weightInKg: parseFloat(e.target.value) //Parses the input string as a floating-point number, ensuring the weight is stored as a numerical value.
                                        })
                                    }}
                                />
                           
                                <Select
                                    color="neutral"
                                    placeholder="Activity Level"
                                    size="lg"
                                    variant="outlined"

                                    onChange={(
                                        event: React.SyntheticEvent | null, //Typing for the event object, allowing null indicating that the event might not always be provided.
                                        newValue: string | null, //Whatever is the newValue is the exact value
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            activityLevel: newValue?.toString() || '' //Sets the activityLevel in state to the new value or an empty string if null.
                                        })
                                    }} //Options for the activity level below
                                > 
                                    <Option value="sedentary">Sedentary</Option> 
                                    <Option value="light">Light</Option>
                                    <Option value="moderate">Moderate</Option>
                                    <Option value="active">Active</Option>
                                    <Option value="veryActive">Very Active</Option>
                                </Select>

                                <Select
                                    color="neutral"
                                    placeholder="Goal"
                                    size="lg"
                                    variant="outlined"

                                    onChange={( //Ffunction defined to handle changes to the selected value in the dropdown.
                                        event: React.SyntheticEvent | null, //This parameter is the event triggered by changing the selection, can be null 
                                        newValue: string | null, //This parameter is the new selected value from the dropdown, or null if the selection is cleared.
                                    ) => {
                                        setSignupFormData({ //Calls the setSignupFormData function to update the signup form's state.
                                            ...signupformData, //Spreads the current state to retain all existing form values.
                                            goal: newValue?.toString() || '' //Sets the 'goal' field to the new value, converted to a string, or to an empty string if newValue is null.
                                        })
                                    }}
                                >
                                    <Option value="weightLoss">Lose</Option>
                                    <Option value="weightMaintain">Maintain</Option>
                                    <Option value="weightGain">Gain</Option>
                                </Select>

                                <Select
                                    color="neutral"
                                    placeholder="Gender"
                                    size="lg"
                                    variant="outlined"

                                    onChange={(
                                        event: React.SyntheticEvent | null,
                                        newValue: string | null,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            gender: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>

                                <label htmlFor="">Height</label>


                                <Input color="neutral" size="lg" variant="outlined" type="number" placeholder='cm'
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            heightInCm: parseFloat(e.target.value)
                                        })
                                    }}
                                />


                                <label htmlFor="">Date of Birth</label> 
                                
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker 
                                        //defaultValue={dayjs(new Date())} //Initializes the date picker with today's date using Day.js.
                                        defaultValue={dayjs('2000-01-01')} 
                                        sx={{
                                            backgroundColor: 'white',
                                        }}

                                        onChange={(newValue) => { //Defines what happens when a new date is selected in the picker.
                                            setSignupFormData({
                                                ...signupformData, //Retains all existing signup form data.
                                                //Updates the 'dob' field in the form state with the new date, converting from Day.js to a standard Date object.
                                                dob: new Date(newValue as any) //Ensure the dob is a date object. Whatever is in the dob will be converted to a date object
                                            })
                                        }}
                                    />
                                </LocalizationProvider>

                            <button
                            //Sets up an onClick event handler that prevents the default form submission behavior and triggers the handleSignup function.
                                onClick={(e)=> {
                                    e.preventDefault()
                                    handleSignup() //if someone tries to signup, triggers the handleSignup function
                                }}
                            >Signup</button>
                        </form>

                        <p>Existing user? <button onClick={()=> { //if clicked on this button, shows the login form hence set to false
                        setShowSignup(false) 
                        }}>Login </button>
                        </p>
                    </div>

                     
                </div>
                </div>
            ): (
                <div className='authform'> 
                    <div className='left'>
                        <Image src={logo} alt='Logo' />
                    </div>
                    <div className='right'>
                        <h1>Login to start tracking!</h1>
                        <form action=''>
                       
                        <Input
                                    color="neutral"
                                    placeholder="email"
                                    size="lg"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            email: e.target.value
                                        })
                                    }}
                                />

                                <Input
                                    color="neutral"
                                    placeholder="password"
                                    size="lg"
                                    variant="outlined"
                                    type='password'

                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            password: e.target.value
                                        })
                                    }}
                                />
<br/>
                            <button
                                onClick={(e)=> {
                                    e.preventDefault()
                                    handleLogin() //if someone tries to login, triggers the handleLogin function
                                }}
                            >Login</button>
                        </form>
                        <p>New user? <button onClick={()=> { //if clicked on this button, shows the sign up form hence set to true
                            setShowSignup(true) 
                         }}>Signup </button>
                        </p>
                    </div>

                     
                </div>
            )
        }
    </div>
  )
}

export default AuthPopup


