const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    hotel:{ type: Schema.Types.ObjectId, ref: 'Hotel'},
    roomId: {type: Schema.Types.ObjectId, ref: 'RoomType'},
    roomQuantity: {type: Number, default: 1},
    dateStart: { type: Date },
    dateEnd: { type: Date },
    cardInfo: { cardType: String, cardNumber: String, nameOnCard: String, expDate: String, cardCvc: String },
    isCancel: { type: Boolean, default: false }
})

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;