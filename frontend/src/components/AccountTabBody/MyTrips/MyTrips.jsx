import React, { useState, useEffect } from 'react';

import { Spinner, Carousel } from 'react-bootstrap';

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
            {/* First Hotel Information */}
            <div className="profile-tab-body-flex hotel-card">
                <div id="profile-tab-body-myTrips-left">
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Location:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">WA</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Room type:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">1 Queen bed</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Price:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">$250</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Start:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">November 12, 2021</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">End:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">November 16, 2021</div>
                    </div>
                </div>
                <div id="profile-tab-body-myTrips-right">
                    <div className="profile-tab-body-myTrips-right-carousel">
                        <div class="profile-tab-body-myTrips-right-carousel-hotelName">Hotel Name</div>
                        <Carousel>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg?text=First slide&bg=373940"
                                alt="hotel"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src="https://media.cntraveler.com/photos/613aabab7084bd911b309b44/master/pass/Nobu%20Hotel%20Chicago_006-NC-Zen%20Deluxe.jpg"
                                alt="hotel"
                              />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>

            {/* Second Hotel Information */}
            <div className="profile-tab-body-flex hotel-card">
                <div id="profile-tab-body-myTrips-left">
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Location:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">WA</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Room type:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">1 Queen bed</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Price:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">$250</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">Start:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">November 12, 2021</div>
                    </div>
                    <div className="profile-tab-body-myTrips-left-sec">
                        <div className="profile-tab-body-myTrips-left-sec-label">End:</div>
                        <div className="profile-tab-body-myTrips-left-sec-value">November 16, 2021</div>
                    </div>
                </div>
                <div id="profile-tab-body-myTrips-right">
                    <div className="profile-tab-body-myTrips-right-carousel">
                        <div class="profile-tab-body-myTrips-right-carousel-hotelName">Hotel Name</div>
                        <Carousel>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg?text=First slide&bg=373940"
                                alt="hotel"
                              />
                            </Carousel.Item>
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src="https://media.cntraveler.com/photos/613aabab7084bd911b309b44/master/pass/Nobu%20Hotel%20Chicago_006-NC-Zen%20Deluxe.jpg"
                                alt="hotel"
                              />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
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