const express = require('express');
const router = express.Router();

const { getReservation, createReservation, getReservationById, cancelReservationById, getReservationsByDay } = require('../../controller/reservation-controller');
const { getReservation, createReservation, getReservationById, updateReservationById, cancelReservationById } = require('../../controller/reservation-controller');

// PATH:  /api/reservation/
router.get('/', async (req, res) => {
    try {
        const response = await getReservation();
        console.log(response);
        res.json(response);
    }catch(error){
        res.status(500).json(error);
    }
})
router.get('/day/:day/:roomId', async (req, res) => {
    try {
        console.log('inside day path');
        console.log(req.params.day); //day should be iso format: YYYY-MM-DD
        const response = await getReservationsByDay(req.params.day, req.params.roomId);
        res.json(response);
    }catch(error){
        res.status(500).json(error);
    }
})
router.get('/:id', async (req, res) => {
    try {
        console.log('inside id');
        console.log(req.params.id);
        const response = await getReservationById(req.params.id);
        console.log(response);
        res.json(response);
    }catch(error){
        res.status(500).json(error);
    }
})

router.put('/update/:reservationId/:userId/:roomPrice', async (req, res) => {
    try {
        console.log(req.params.reservationId);
        console.log(req.params.userId);
        console.log(req.params.roomPrice);
        console.log(req.body);
        const response = await updateReservationById(req.body, req.params.reservationId, req.params.userId, req.params.roomPrice);
        console.log(response);
        res.json(response);
    }catch(error){
        res.status(500).json(error);
    }
})


router.put('/cancel/:id/:userId', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.params.userId);
        const response = await cancelReservationById(req.params.id, req.params.userId);
        console.log(response);
        res.json(response);
    }catch(error){
        res.status(500).json(error);
    }
})

router.post('/:userId/:roomPrice', async (req, res) => {
    try {
        console.log(req.params.userId)
        console.log(req.body);
        const response = await createReservation(req.body, req.params.userId, req.params.roomPrice);
        // console.log(response);
        res.json(response);
    }catch(error){
        // console.log(error);
        res.status(500).json(error);
    }
})

module.exports = router;