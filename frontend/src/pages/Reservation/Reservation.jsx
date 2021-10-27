import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import HotelList from '../../components/HotelList';
import ReserveForm from './ReserveForm';

const Reservation = ({match}) => {
    const id = match.params.id
    console.log(id);
    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`http://localhost:8080/api/hotel/id/${id}`);
            console.log(data);
            setHotel([data]);
        })();
      }, []);

    return (
        <div>
            <HotelList hotels={hotel} showAll={true}/>
            <ReserveForm rooms={hotel.roomType} hotelid={hotel._id}/>
        </div>
    )
}

export default Reservation
