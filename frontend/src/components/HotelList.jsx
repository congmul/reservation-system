import React from 'react'
import Card from './Card'

const HotelList = (props) => {
    console.log('inside list', props.hotels);
    return (
        props.hotels.length == 0 ? <h3>Not loaded yet</h3>
        :
        <>
        {props.hotels.map((hotel) => {
            return(
                <Card key={hotel._id} hotel={hotel}/>
            )}
        )}
        </>
        
    )
}

export default HotelList
