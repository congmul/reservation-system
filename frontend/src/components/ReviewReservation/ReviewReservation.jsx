import React, { useState, useEffect } from 'react';

import './reviewReservation.css';

import Auth from '../../utils/auth';
import { getSingleUser, updateCardInfo } from '../../utils/user-API';

import { Spinner } from 'react-bootstrap';

import HotelReviewCard from './HotelReviewCard/HotelReviewCard';
import CardInfo from './CardInfo/CardInfo';
import BillingAddress from './BillingAddress/BillingAddress';

const ReviewReservation = ({allReviewState, setIsReviewReservation}) => {

    const [ user, setUser ] = useState(null);
    // const [ isCardInfo, setIsCardInfo ] = useState(false);

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

    useEffect(() => {
        document.getElementById("reviewReservation-backdrop").style.display = "block";
        const signFormModal = document.getElementById("reviewReservation-modal");
        signFormModal.style.display = "block"
        signFormModal.classList.add("show")
    }, [])

    const closeModal = () => {
        document.getElementById("reviewReservation-backdrop").style.display = "none"
        document.getElementById("reviewReservation-modal").style.display = "none"
        document.getElementById("reviewReservation-modal").classList.remove("show")

        setIsReviewReservation(false);
    }

    // Check if There is  Card information
    const checkCardInfo = () => {
        if(user.cardInfo != null 
            && user.cardInfo.cardType.length > 0
            && user.cardInfo.cardCvc.length > 0
            && user.cardInfo.cardNumber.length > 0
            && user.cardInfo.expDate.length > 0
            && user.cardInfo.nameOnCard.length > 0
        ){
            return true;
        }else{
            return false;
        }
    }

    const submitReservation = () => {
        if(checkCardInfo()){
            console.log("Make a reservation")
        }else{
            console.log("Have to Input card Information")
            alert("Please Add Credit Card Information")
        }
    }

    return(<>
    <div>
        <section className="reviewReservation modal fade" id="reviewReservation-modal" tabIndex="-1">
            <div className="reviewReservation-header">
                <button type="button" className="close btn reviewReservation-header-close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div className="reviewReservation-body">
                <div className="review-hotel-info">
                    <HotelReviewCard allReviewState={allReviewState} />
                </div>
                <div className="review-card-info reviewReseravation-flex">
                    {user != null
                    ? <>
                        <div>
                            <h4 className="text-center mb-5">Card Information</h4>
                            <CardInfo user={user} setUser={setUser} /> 
                        </div>
                        <div>
                            <h4 className="text-center mb-5">Billing Address</h4>
                            <BillingAddress user={user} setUser={setUser} />
                        </div>
                    </>
                    : <div className="flex-center">
                        <Spinner animation="border" variant="success" />
                      </div>}
                </div>
                <div className="reviewReseravation-flex">
                    <button className="reviewReseravation-submit-btn" onClick={submitReservation}>Make a reservation</button>
                </div>
            </div>
        </section>
        <div className="modal-backdrop fade show" id="reviewReservation-backdrop" style={{"display":"none"}}></div>
    </div> 
    </>)
}

export default ReviewReservation;