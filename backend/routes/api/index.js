const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const hotelRoutes = require('./hotel-routes');
const reservationRoutes = require('./reservation-routes');

// Routes
router.use('/user', userRoutes);
router.use('/hotel', hotelRoutes);
router.use('/reservation', reservationRoutes);


module.exports = router;