const { Reservation, User, Hotel } = require('../models');
const mongoose = require('mongoose');

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
const getReservationsByDay = async (iso, roomId) => {
    //finds noncancelled reservations that overlap a specified day for a specified room
    try {
        const isoDay = iso.slice(-2);
        const isoMonth = iso.slice(5, 7);
        const isoYear = iso.slice(0, 4);
        const toDate = new Date(isoYear, isoMonth-1, isoDay); //breaking up iso date is necessary to avoid timezone issues
        const response = await Reservation.find({dateStart: {$lte: toDate}, dateEnd: {$gt: toDate},
             roomId: roomId, isCancel: false}).populate('hotel');
       
        return response;
    }catch(error) {
        return {message: "Cannot find the reservation", error};
    }
}
const cancelReservationById = async (id, userId) => {
    try {
        console.log("reservation id",id)
        console.log("user id",userId)

        const userData = await User.find({"_id": userId})
        const getReservation = await Reservation.find({"_id": id}).populate('hotel');
        console.log("userData", userData[0])
        console.log("getReservation", getReservation[0]);

        // Storing the current Points & Nights
        let currentPoints = userData[0].points;
        let currentNights = userData[0].totalNights;

        let inputStartDate = new Date(getReservation[0].dateStart);
        let inputEndDate = new Date(getReservation[0].dateEnd);

        let roomId = getReservation[0].roomId;
        let roomTypeArr = getReservation[0].hotel.roomType;
        // console.log("roomId", roomId)
        let selectedRoomType = roomTypeArr.filter(roomType => mongoose.Types.ObjectId(roomType._id).equals(roomId));
        // console.log("selectedRoomType", selectedRoomType)
        let roomPrice = selectedRoomType[0].price;

        let diffDate = (new Date(inputEndDate).getDate() + 1) - (new Date(inputStartDate).getDate() + 1)
        let diffMonth = (new Date(inputEndDate).getMonth() + 1) - (new Date(inputStartDate).getMonth() + 1)
        let diffYear = (new Date(inputEndDate).getFullYear() + 1) - (new Date(inputStartDate).getFullYear() + 1)

        console.log(diffDate, diffMonth, diffYear)

        let stayDays = diffDate + (diffMonth * 30) + (diffYear * 365);

        let updatedNights = currentNights - stayDays;

        // 2 points per dollar
        let updatedPoints = currentPoints - ((roomPrice * 2) * stayDays);
        console.log(updatedNights, updatedPoints);

        // Update for Storing reservation id and Points and Nights to User.
         const userResponse = await User.updateOne({"_id": userId}, 
         {$set : {"points": updatedPoints, "totalNights": updatedNights} },
         { new: true })
        
        // Update Reservation
        const response = await Reservation.updateOne({"_id": id}, { isCancel: true });
        return {message: "cancel it successfully", updatedNights, updatedPoints};
        // return {message: "cancel it successfully", response, userResponse, updatedNights, updatedPoints};
    }catch(error) {
        return {message: "Cannot find the reservation", error};
    }
}

// TODO:
const updateReservationById = async (reservationData, reservationId, userId, roomPrice=0, previousNights, previousPoints) => {
    console.log("In Controller", reservationData, reservationId, userId, roomPrice)
    try {
        // Validation for checking duplicate booked date.
        console.log("userId", userId, "userId")
        const userData = await User.find({"_id": userId}).populate("reservation");
        console.log("userData[0]", userData);
        if(userData.length == 0){
            return {message: "Cannot find the user"}
        }
        // Getting all upComing Reservation of the user to compare them with InputReservation.
        let upComingUserReservation = userData[0]["reservation"] ? 
                userData[0].reservation.filter(userReservationData => {
                    let currentDate = new Date();
                    let dateStart = userReservationData.dateStart;
                    console.log(userReservationData);
                    if(dateStart >= currentDate && !userReservationData.isCancel && !mongoose.Types.ObjectId(userReservationData._id).equals(reservationId)){
                        console.log(dateStart, "in ifstatment")
                        return userReservationData;
                    }
                }) 
            : [];
        
        let previousReservation = userData[0]["reservation"] ? 
        userData[0].reservation.filter(userReservationData => {
            if(mongoose.Types.ObjectId(userReservationData._id).equals(reservationId)){
                return userReservationData;
            }
        }) 
    : [];

        console.log("upComingUserReservation", upComingUserReservation);
        console.log("previousReservation", previousReservation[0]);
        console.log("reservationData", reservationData)

        let previousStartDate = new Date(previousReservation[0].dateStart);
        let previousEndDate = new Date(previousReservation[0].dateEnd);

        let inputStartDate = new Date(reservationData.dateStart);
        let inputEndDate = new Date(reservationData.dateEnd);

        for(let i = 0; i < upComingUserReservation.length; i++){
            // Case 1. When InputStartDate is less then or equal to dateStart
            if(inputStartDate <= upComingUserReservation[i].dateStart && upComingUserReservation[i].dateStart <= inputEndDate){
               //   |----|   or  |----|: exit reservation
               // |--------| or |--| : new reservation
               throw {message: "You have a reservation for the date.", data: upComingUserReservation[i]}
            }
            // Case 2. When InputStartDate is greater then or equal to dateStart
            else if(upComingUserReservation[i].dateStart <= inputStartDate && inputStartDate <= upComingUserReservation[i].dateEnd){
               // |------|   or  |------|: exit reservation
               //   |------| or   |---| : new reservation
               throw {message: "You have a reservation for the date.", data: upComingUserReservation[i]}           
            }
        }
        
        console.log("Make a reservation!!")

        const reservationInfo = await Reservation.findOneAndUpdate({"_id": reservationId}, reservationData);


        let previousdiffDate = (new Date(previousEndDate).getDate() + 1) - (new Date(previousStartDate).getDate() + 1)
        let previousdiffMonth = (new Date(previousEndDate).getMonth() + 1) - (new Date(previousStartDate).getMonth() + 1)
        let previousdiffYear = (new Date(previousEndDate).getFullYear() + 1) - (new Date(previousStartDate).getFullYear() + 1)

        console.log(previousdiffDate, previousdiffMonth, previousdiffYear)
        let previousstayDays = previousdiffDate + (previousdiffMonth * 30) + (previousdiffYear * 365);

        // Storing the current Points & Nights
        let currentPoints = userData[0].points - previousstayDays * parseInt(roomPrice) * 2;
        let currentNights = userData[0].totalNights - previousstayDays;


        let diffDate = (new Date(inputEndDate).getDate() + 1) - (new Date(inputStartDate).getDate() + 1)
        let diffMonth = (new Date(inputEndDate).getMonth() + 1) - (new Date(inputStartDate).getMonth() + 1)
        let diffYear = (new Date(inputEndDate).getFullYear() + 1) - (new Date(inputStartDate).getFullYear() + 1)

        console.log(diffDate, diffMonth, diffYear)
        let stayDays = diffDate + (diffMonth * 30) + (diffYear * 365);

        let updatedNights = stayDays + currentNights;

        // 2 points per dollar
        let updatedPoints = ((parseInt(roomPrice) * 2) * stayDays) + currentPoints;
        console.log(updatedNights, updatedPoints);



        // // Update for Storing reservation id and Points and Nights to User.
        const userResponse = await User.updateOne({"_id": userId}, 
        {$set : {"points": updatedPoints, "totalNights": updatedNights} },
        { new: true })
        console.log(userResponse);
        return {message: "Succeed", updatedNights, updatedPoints}

    }catch(error){
        throw error;
    }
}

const createReservation = async (reservationData, userId, roomPrice=0) => {
    try {
        // Validation for checking duplicate booked date.
        console.log("userId", userId, "userId")
        const userData = await User.find({"_id": userId}).populate("reservation");
        console.log("userData[0]", userData);
        if(userData.length == 0){
            return {message: "Cannot find the user"}
        }


        // Getting all upComing Reservation of the user to compare them with InputReservation.
        let upComingUserReservation = userData[0]["reservation"] ? 
                userData[0].reservation.filter(userReservationData => {
                    let currentDate = new Date();
                    let dateStart = userReservationData.dateStart;
                    if(dateStart >= currentDate && !userReservationData.isCancel){
                        console.log(dateStart, "in ifstatment")
                        return userReservationData;
                    }
                }) 
            : [];

        console.log("upComingUserReservation", upComingUserReservation);
        console.log("reservationData", reservationData)

        let inputStartDate = new Date(reservationData.dateStart);
        let inputEndDate = new Date(reservationData.dateEnd);

        for(let i = 0; i < upComingUserReservation.length; i++){
            // Case 1. When InputStartDate is less then or equal to dateStart
            if(inputStartDate <= upComingUserReservation[i].dateStart && upComingUserReservation[i].dateStart <= inputEndDate){
               //   |----|   or  |----|: exit reservation
               // |--------| or |--| : new reservation
               throw {message: "You have a reservation for the date.", data: upComingUserReservation[i]}
            }
            // Case 2. When InputStartDate is greater then or equal to dateStart
            else if(upComingUserReservation[i].dateStart <= inputStartDate && inputStartDate <= upComingUserReservation[i].dateEnd){
               // |------|   or  |------|: exit reservation
               //   |------| or   |---| : new reservation
               throw {message: "You have a reservation for the date.", data: upComingUserReservation[i]}           
            }
        }
        
        console.log("Make a reservation!!")
        const reservationInfo = await Reservation.create(reservationData);

        // Storing the current Points & Nights
        let currentPoints = userData[0].points;
        let currentNights = userData[0].totalNights;


        let diffDate = (new Date(inputEndDate).getDate() + 1) - (new Date(inputStartDate).getDate() + 1)
        let diffMonth = (new Date(inputEndDate).getMonth() + 1) - (new Date(inputStartDate).getMonth() + 1)
        let diffYear = (new Date(inputEndDate).getFullYear() + 1) - (new Date(inputStartDate).getFullYear() + 1)

        console.log(diffDate, diffMonth, diffYear)
        let stayDays = diffDate + (diffMonth * 30) + (diffYear * 365);

        let updatedNights = stayDays + currentNights;

        // 2 points per dollar
        let updatedPoints = ((parseInt(roomPrice) * 2) * stayDays) + currentPoints;
        console.log(updatedNights, updatedPoints);



        // // Update for Storing reservation id and Points and Nights to User.
        const userResponse = await User.updateOne({"_id": userId}, 
        {$set : {"points": updatedPoints, "totalNights": updatedNights}, $push: { reservation: reservationInfo._id} },
        { new: true })
        console.log(userResponse);
        return {message: "Succeed", updatedNights, updatedPoints}

    }catch(error) {
        throw error;
    }
}

module.exports = {
    getReservation,
    getReservationById,
    getReservationsByDay,
    updateReservationById,
    cancelReservationById,
    createReservation

}