const { Reservation } = require('../models');

const getReservation = async () => {
    try {
        const response = await Reservation.find({}).populate('hotel');
        return response;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    getReservation,

}