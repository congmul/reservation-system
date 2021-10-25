import React from 'react'

const Card = ({hotel}) => {
    return (
        <div className="card mx-auto my-2 w-25" role="button">
            <div className="card-header">
                <p>{hotel.name} Hotel</p>    
            </div>
            <div className="card-body bk-img bg-transparent" style={{backgroundImage: `url(${hotel.image})`, height: "200px"}}>
                <p className="text-center p-2 px-3 mb-0 rounded">{hotel.location.city}, {hotel.location.state}</p>
            </div>
        </div>
    ) 
}

export default Card
