const express = require('express');
const router = express.Router();

const { getReservation, createReservation } = require('../../controller/reservation-controller');

// PATH:  /api/reservation/
router.get('/', async (req, res) => {
    try {
        const response = await getReservation();
        console.log(response);
        res.json(response);
    }catch(error){
        throw error;
    }
})

router.post('/:username', async (req, res) => {
    try {
        console.log(req.body);
        const response = await createReservation(req.body, req.params.username);
        // console.log(response);
        res.json(response);
    }catch(error){
        throw error;
    }
})

module.exports = router;