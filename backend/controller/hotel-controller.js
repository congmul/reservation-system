const { Hotel } = require('../models');

const getHotelById = async (id) => {
    try {
        const response = await Hotel.findById(id);
        return response;
    }catch(error) {
        throw error;
    }
}
const getAllHotels = async () => {
    try{
        const hotels = await Hotel.find();
        if(hotels.length === 0) throw {status: 500, error: "Could not find any hotels"};
        //if we want to sort the results, chain .sort({parameter: 1}) after find()
    }catch(error){
        throw error;
    }
}
const getHotelByName = async (name) => {
    try {
        const response = await Hotel.findOne({name: name}); //name is unique
        if (response == null) throw {status: 500, error: `Could not find hotel with name ${name}`};
        return response;
    }catch(error) {
        throw error;
    }
}
const getHotelsByCity = async (city) => {
    try {
        const hotels = await Hotel.find({"location.city": city}); //nested objects-surround with ""
        if (hotels.lenght == 0) throw {status: 500, error: `Could not find any hotels in ${city}`};
        return hotels;
    }catch(error) {
        throw error;
    }
}
module.exports = {
    getHotelById,
    getAllHotels,
    getHotelsByCity,
    getHotelByName
}