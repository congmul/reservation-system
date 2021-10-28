const { Reservation, User } = require('../models');

const getReservation = async () => {
    try {
        const response = await Reservation.find({}).populate('hotel');
        return response;
    }catch(error) {
        return {message: "Cannot find the reservation", error}
    }
}

const getReservationById = async (id) => {
    try {
        const response = await Reservation.find({"_id": id}).populate('hotel');
        return response;
    }catch(error) {
        return {message: "Cannot find the reservation", error};
    }
}

const createReservation = async (reservationData, username) => {
    try {
        // Validation for checking duplicate booked date.
        const userData = await User.find({"username": username}).populate("reservation");
        console.log("userData[0]", userData);
        if(userData.length == 0){
            return {message: "Cannot find the user"}
        }

        let upComingUserReservation = userData[0]["reservation"] ? 
                userData[0].reservation.filter(userReservationData => {
                    let currentDate = new Date();
                    let dateStart = userReservationData.dateStart;
                    if(dateStart >= currentDate){
                        console.log(dateStart, "in ifstatment")
                        return userReservationData;
                    }
                }) 
            : [];

        console.log(upComingUserReservation);
        console.log(reservationData)

        let inputStartDate = new Date(reservationData.dateStart);
        let inputEndDate = new Date(reservationData.dateEnd);

        for(let i = 0; i < upComingUserReservation.length; i++){
            // Case 1. When InputStartDate is less then or equal to dateStart
            if(inputStartDate <= upComingUserReservation[i].dateStart && upComingUserReservation[i].dateStart <= inputEndDate){
               //   |----|   or  |----|: exit reservation
               // |--------| or |--| : new reservation
               return {message: "You have a reservation for the date.", data: upComingUserReservation[i]}
            }
            // Case 2. When InputStartDate is greater then or equal to dateStart
            else if(upComingUserReservation[i].dateStart <= inputStartDate && inputStartDate <= upComingUserReservation[i].dateEnd){
               // |------|   or  |------|: exit reservation
               //   |------| or   |---| : new reservation
               return {message: "You have a reservation for the date.", data: upComingUserReservation[i]}           
            }
        }
        
        console.log("Make a reservation!!")
        const reservationInfo = await Reservation.create(reservationData);

        // Update for Storing reservation id to User.
        const userResponse = await User.updateOne({"username": username}, {$push: { reservation: reservationInfo._id}})

        return {message: "Succeed"}

    }catch(error) {
        throw error;
    }
}

module.exports = {
    getReservation,
    getReservationById,
    createReservation

}