const mongoose = require('mongoose');
const roomTypeSchema = require('./RoomType');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: { type : String, required: true, unique: true },
    location: { street: String, city: String, zipcode: Number, state: String},
    roomType: [roomTypeSchema],
    createAt: { type: Date, default: Date.now },
    image: {type: String, default: "https://images.financialexpress.com/2020/09/hotel-660x440-620x413.jpg"}
})

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;