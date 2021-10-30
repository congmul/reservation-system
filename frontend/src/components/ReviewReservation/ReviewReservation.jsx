import React, { useEffect } from 'react';

import './reviewReservation.css';

import { Carousel, Spinner } from 'react-bootstrap';

import HotelReviewCard from './HotelReviewCard/HotelReviewCard';

const ReviewReservation = ({allReviewState, setIsReviewReservation}) => {

    useEffect(() => {
        document.getElementById("reviewReservation-backdrop").style.display = "block";
        const signFormModal = document.getElementById("reviewReservation-modal");
        signFormModal.style.display = "block"
        signFormModal.classList.add("show")
    }, [])

    function closeModal() {
        document.getElementById("reviewReservation-backdrop").style.display = "none"
        document.getElementById("reviewReservation-modal").style.display = "none"
        document.getElementById("reviewReservation-modal").classList.remove("show")

        setIsReviewReservation(false);
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
            </div>
        </section>
        <div className="modal-backdrop fade show" id="reviewReservation-backdrop" style={{"display":"none"}}></div>
    </div> 
    </>)
}

export default ReviewReservation;