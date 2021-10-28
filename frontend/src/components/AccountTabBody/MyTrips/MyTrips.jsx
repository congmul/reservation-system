import React, { useState, useEffect } from 'react';

import { Spinner } from 'react-bootstrap';

import HotelCard from './HotelCard/HotelCard';

import Auth from '../../../utils/auth';
import { getSingleUser } from '../../../utils/user-API';

import './mytrips.css';

const MyTrips = () => {

    const [ user, setUser ] = useState(null);

    useEffect(() => {
        (async () => {
            try{
                const userData = await Auth.getProfile();
                const token = Auth.getToken();
                const user = await getSingleUser(userData.data.username, token);
                console.log(user);
                setUser(user.data[0])      
            }catch(err) {
                console.log(err);
            }
        })();
    }, [])

    const onClickTripsMenu = (event) => {
        const profileTabMenu = document.getElementsByClassName('profile-tab-body-myTrips-menu-div');

        for(let i = 0; i < profileTabMenu.length; i++){
            profileTabMenu[i].classList.remove('profile-tab-body-myTrips-clicked');
        }
        event.target.classList.add('profile-tab-body-myTrips-clicked');
    }

    return(<>{user != null ? <>
        <div id="profile-tab-body-myTrips-header">
            <div className="profile-tab-body-myTrips-menu" onClick={onClickTripsMenu}>
                <div className="profile-tab-body-myTrips-menu-div profile-tab-body-myTrips-clicked">
                    Upcoming
                </div>
            </div>
            <div className="profile-tab-body-myTrips-menu" onClick={onClickTripsMenu}>
                <div className="profile-tab-body-myTrips-menu-div">
                    Canceled
                </div>
            </div>
            <div className="profile-tab-body-myTrips-menu" onClick={onClickTripsMenu}>
                <div className="profile-tab-body-myTrips-menu-div">
                    Past Trips
                </div>
            </div>
        </div>
        <div className="profile-tab-myTrips-hotel-info">
            <HotelCard />
            <HotelCard />
        </div>
        </>
        :
        <div className="profile-tab-body-flex justify-content-center">
        <Spinner animation="border" variant="success" />
        </div>
        }
    </>);
}

export default MyTrips;