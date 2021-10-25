import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import HotelList from '../../components/HotelList';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('http://localhost:8080/api/hotel');
            console.log(data);
            setHotels(data);
        })();
      }, []);

    return (
        <div className="m-5 w-25">
            <h5 className="mx-5 mb-3">Showing All Hotels: </h5>
            <HotelList hotels={hotels} showAll={true}/>

        </div>
    )
}

export default Hotels
