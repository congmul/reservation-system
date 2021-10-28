const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomTypeSchema = new Schema({
    name: { type : String, required: true},
    beds: Number,
    price: Number,
    quantity: Number
})


module.exports = roomTypeSchema;