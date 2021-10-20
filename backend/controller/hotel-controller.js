const { Hotel } = require('../models');

const getHotel = async () => {
    try {
        const response = await Hotel.find({});
        return response;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    getHotel,

}