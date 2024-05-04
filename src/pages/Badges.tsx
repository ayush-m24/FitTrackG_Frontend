import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Badges.module.css'; 
import Navbar from '@/components/Navbar/Navbar' 

//Function definition for displaying badges
const Badges = () => {
    //Type definition for the keys of the badges object
    type BadgeKeys = 'calorieIntake' | 'sleep' | 'steps' | 'water';
    //State hook for storing badge achievements
    const [badges, setBadges] = useState<Record<BadgeKeys, boolean>>({
        calorieIntake: false,
        sleep: false,
        steps: false,
        water: false
    });

    //Effect hook to fetch badges data when the component mounts
    useEffect(() => {
        async function fetchBadges() {
            //Fetching badges data from the server
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/badges`, {
                credentials: 'include', //Including credentials for CORS
            });
            const data = await response.json(); 
            if (data.ok) {
                setBadges(data.badges); //Updating the state with fetched badges
            }
        }

        fetchBadges(); //Calling the fetch function
    }, []); //Empty dependency array to run only once on mount

    return (
        
        <div className={styles.container}>
            <Navbar /> 
            <h1>Your Achievements</h1> 
            
            <div className={styles.badgesContainer}>
                {Object.entries(badges).map(([key, earned]) => { //Mapping each badge state to a visual representation
                    const badgeKey = key as BadgeKeys; //Type assertion for TypeScript
                    return (
                        // Individual badge container
                        <div key={badgeKey} className={styles.badge}>
                            <Image
                                src={`/images/${badgeKey}.png`} //Image source pointing to static assets
                                alt={`${badgeKey} badge`} 
                                width={100} //Fixed width for the image
                                height={100} //Fixed height for the image
                                layout="fixed" //Ensuring the image dimensions are fixed
                            />
                           
                            <p className={earned ? styles.earned : styles.notEarned}>
                                {earned ? "Earned" : "Not Earned"}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Badges; //Exporting the Badges component for use in other parts of the app
