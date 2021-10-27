import React from 'react';

import { Carousel } from 'react-bootstrap';

const HotelCard = () => { 

    return(
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
    )}

export default HotelCard; 