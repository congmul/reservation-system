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
                        <Card key={hotel._id} hotel={hotel}/>
                    )}
                )};
                {props.hotels.map((hotel) => {
                    return(
                        <HotelTable key={hotel._id} hotel={hotel}/>
                    )}
                )};
            </>
    )
}

export default HotelList
