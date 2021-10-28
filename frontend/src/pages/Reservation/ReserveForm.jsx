import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import RoomList from './RoomList';

const ReserveForm = ({rooms, hotelid}) => {
    const [formData, setFormData] = useState({ checkin: '', checkout: '' , numRooms: ''}); 
    const [available, setAvailable] = useState([]); //show none by default
    const [show, setShow] = useState(false);
    const [nights, setNights] = useState(0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setShow(false);
    };

    const findAvailable = async (event) =>{
        event.preventDefault();
        console.log(formData);
        //convert checkin/checkout, find difference
        const date1 = new Date(formData.checkin);
        const date2 = new Date(formData.checkout);
        const timeDif = date2.getTime() - date1.getTime();
        setNights(timeDif / (1000 * 3600 *24)); //convert to days
        
        try{
        //some axios call
        //do some checking with reservations in the selected time frame, find which rooms are available
            let checked = [];
            for(let room of rooms){
                if(room){ //some check/logic; if available, add to the list
                    checked.push(room);
                }
            }
            setAvailable(checked);
            setShow(true);
        } catch(err){
            alert(err);
        }
    }
    //check avail. = user enters dates and room qt -> check every room type's avail for every day within the period. 
    //display list of room types available with button for reserving
    //if no rooms available, give message
    //reserve button - only works if user is logged in, otherwise message
    return (
      <>
        <div className="border rounded p-3 mx-3">
            <h5>Check Availability: </h5>
            <form className="p-3" onSubmit={findAvailable}>
            <div className="d-md-flex">
                <div className="m-3">
                    <label for="checkin" className="form-label">Check In:</label>
                    <input type="date" className="form-control" id="checkin" name="checkin" onChange={handleInputChange}/>
                </div>
                <div className="m-3">
                    <label for="checkout" className="form-label">Check Out:</label>
                    <input type="date" className="form-control" id="checkout" name="checkout" onChange={handleInputChange}/>
                </div>
                <div className="m-3">
                    <label for="numRooms" className="form-label">Rooms:</label>
                    <input type="number" className="form-control" id="numRooms" name="numRooms" onChange={handleInputChange}/>
                </div>
                <div className="m-3 mt-5">
                    <button className="btn btn-dark rounded-pill">Submit</button>
                </div>
                </div>
            </form>
        </div>
        {show ? <RoomList rooms={available} nights={nights} numRooms={formData.numRooms} hotelid={hotelid}/> : <></>}
      </>
    )
}

export default ReserveForm
