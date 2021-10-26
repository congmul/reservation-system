import React from 'react'
import HotelTable from '../pages/Hotels/HotelTable';
import Card from './Card'

const HotelList = (props) => {
    //logic: if no hotels, h3 only. if showAll=false, show only card. otherwise, show card+table
    return (
        props.hotels.length == 0 ? <h3>Not loaded yet</h3>
        : !props.showAll ?
            <>
                {props.hotels.map((hotel) => {
                    return(
                        <Card key={hotel._id} hotel={hotel}/>
                    )}
                )};
            </>
            :
            <>
                 {props.hotels.map((hotel) => {
                    return(
                        <div className="d-md-flex border px-3 m-3 w-100">
                            <Card key={hotel._id} hotel={hotel}/>
                            <HotelTable key={hotel._id} location={hotel.location} rooms={hotel.roomType}/>
                        </div>
                    )}
                )};
            </>
    )
}

export default HotelList
