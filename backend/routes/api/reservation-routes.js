const express = require('express');
const router = express.Router();

const { getReservation } = require('../../controller/reservation-controller');

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

module.exports = router;