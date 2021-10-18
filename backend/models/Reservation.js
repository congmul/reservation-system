const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    hotelId:{ type: Schema.Types.ObjectId, ref: 'Hotel'},
    roomId: String,
    dateStart: { type: Date },
    dateEnd: { type: Date },
    isCancel: { type: Boolean, default: false }
})

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;