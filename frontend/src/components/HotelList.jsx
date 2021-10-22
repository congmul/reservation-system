import React from 'react'
import Card from './Card'

const HotelList = (props) => {
    console.log('inside list', props.hotels);
    return (
        props.hotels.length == 0 ? <h3>Not loaded yet</h3>
        :
        <>
        <Card hotel={props.hotels[0]}></Card>
        <Card hotel={props.hotels[1]}></Card>
        <Card hotel={props.hotels[2]}></Card>
        </>
        
        
    )
}

export default HotelList
