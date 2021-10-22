import React from 'react'
import Card from './Card'

const HotelList = (props) => {
    console.log('inside list', props.hotels[0]);
    return (
        <>
        <Card hotel={props.hotels[0]}></Card>
        <Card hotel={props.hotels[1]}></Card>
        <Card hotel={props.hotels[2]}></Card>
        </>
    )
}

export default HotelList
