"use client"
import React from 'react'
import logo from '@/assets/logo.png'
import { RxAvatar } from "react-icons/rx"; //avatar icon from react-icons - for user profile
import './Navbar.css' 
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup';
//import { useRouter } from 'next/router';

const Navbar = () => {
  //hook to check if user is loggedIn
  const [isloggedin, setIsloggedin] = React.useState(false)

  //Receive data from the back-end
  const [data, setData] = React.useState<any>(null)

  const [showpopup, setShowpopup] = React.useState(false)

  //Check th elogin status using the Auth.js in backend api to checklogin in order to change the button on the navbar from login to logout
  const checklogin = async () => { //Function to check login
    fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
        method: 'POST',
        credentials: 'include', //Providing the cookies which are saved
    })
        .then(res => res.json()) 
        .then(data => {
            console.log(data)
            if (data.ok) { //If ok is true then seylogin as true.
                setIsloggedin(true)
            }
            else{
                setIsloggedin(false)
            }
        })
        .catch(err => {
            console.log(err)
        })

}

const handleLogout = async () => {
  try {
    //Call the logout API endpoint
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/logout', {
      method: 'POST',
      credentials: 'include', 
    });
    const data = await response.json();
    if (data.ok) {
      //Update state to reflect that the user is logged out
      setIsloggedin(false);
      
      //Redirect to home page
      window.location.href = '/';
    } else {
      //Handle any error feedback here
      console.error('Logout failed:', data.message);
    }
  } catch (err) {
    //Handle the error here
    console.error('Error during logout:', err);
  }
};




React.useEffect(() => {
    checklogin() //If popup closed "checklogin" function would be intitiated 
}, [showpopup]) //CHeck login function called when showpopup is either open or closed to check login status

  return (
    <nav>
        <Image src={logo} alt='Logo' priority />
        <Link href='/'>Home</Link>
        <Link href='/Badges'>Badges</Link>
      
        {
              isloggedin ?
                    <button onClick={handleLogout}>Logout</button>
                  //<button>Logout</button> //If user is loggedin then Logout button is shown
                  :
                  <button //pop for login shown when Login button is clicked
                  onClick={() => {
                    setShowpopup(true)
                }}
                  >Login</button>
 
        }

            {
                showpopup && <AuthPopup setShowpopup={setShowpopup} /> //if showpopup is true it renders the AuthPopup otherwise null.
            }
    </nav>
  )
}

export default Navbar