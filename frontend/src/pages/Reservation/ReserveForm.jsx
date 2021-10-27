import React from 'react'

const ReserveForm = ({rooms, hotelid}) => {
    //check avail. = user enters dates and room qt -> check every room type's avail for every day within the period. 
    //display list of room types available with button for reserving
    //if no rooms available, give message
    //reserve button - only works if user is logged in, otherwise message
    return (
        <div className="border rounded p-3 mx-3">
            <h5>Check Availability: </h5>
            <form className="p-3">
            <div className="d-md-flex">
                <div className="m-3">
                    <label for="checkin" className="form-label">Check In:</label>
                    <input type="date" className="form-control" id="checkin"/>
                </div>
                <div className="m-3">
                    <label for="checkout" className="form-label">Check Out:</label>
                    <input type="date" className="form-control" id="checkout"/>
                </div>
                <div className="m-3">
                    <label for="rooms" className="form-label">Rooms:</label>
                    <input type="number" className="form-control" id="rooms"/>
                </div>
                <div className="m-3 mt-5">
                    <button className="btn btn-dark rounded-pill">Submit</button>
                </div>
                </div>
            </form>
        </div>
 
    )
}

export default ReserveForm
