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
const cancelReservationById = async (id) => {
    try {
        console.log("reservation id",id)
        const response = await Reservation.updateOne({"_id": id}, { isCancel: true });
        return response;
    }catch(error) {
        return {message: "Cannot find the reservation", error};
    }
}

const createReservation = async (reservationData, username, price=0) => {
    try {
        // Validation for checking duplicate booked date.
        const userData = await User.find({"username": username}).populate("reservation");
        console.log("userData[0]", userData);
        if(userData.length == 0){
            return {message: "Cannot find the user"}
        }


        // Getting all upComing Reservation of the user to compare them with InputReservation.
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

        // Storing the current Points & Nights
        let currentPoints = userData[0].points;
        let currentNights = userData[0].totalNights;

        // TODO: test price 
        let testPrice = 250;

        let diffDate = (new Date(inputEndDate).getDate() + 1) - (new Date(inputStartDate).getDate() + 1)
        let diffMonth = (new Date(inputEndDate).getMonth() + 1) - (new Date(inputStartDate).getMonth() + 1)
        let diffYear = (new Date(inputEndDate).getFullYear() + 1) - (new Date(inputStartDate).getFullYear() + 1)

        console.log(diffDate, diffMonth, diffYear)
        let updatedNights = (diffDate + diffMonth * 30 + diffYear * 365) + currentNights;

        // 2 points per dollar
        let updatedPoints = ((testPrice * 2) * updatedNights) + currentPoints;
        console.log(updatedNights, updatedPoints);



        // // Update for Storing reservation id and Points and Nights to User.
        const userResponse = await User.updateOne({"username": username}, 
        {$set : {"points": updatedPoints, "totalNights": updatedNights}, $push: { reservation: reservationInfo._id} },
        { new: true })
        console.log(userResponse);
        return {message: "Succeed", userResponse}

    }catch(error) {
        throw error;
    }
}

module.exports = {
    getReservation,
    getReservationById,
    cancelReservationById,
    createReservation

}