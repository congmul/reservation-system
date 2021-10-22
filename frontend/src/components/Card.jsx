import React from 'react'

const Card = (props) => {
    console.log('inisde card', props.hotel.name);
    return (
        <div className="card mx-auto mb-2">
            <div className="card-header d-flex justify-content-between top">
                <p>{props.hotel.name}</p>    
            </div>
            <div className="card-body middle">
                <p>{props.hotel.location.city}</p>
            </div>
        </div>
    )
}

export default Card
