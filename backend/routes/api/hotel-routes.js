const express = require('express');
const router = express.Router();

const { getHotel } = require('../../controller/hotel-controller');


// PATH:  /api/hotel/

router.get('/', async (req, res) => {
    try {
        const response = await getHotel();
        console.log(response);
        res.json(response);
    }catch(error){
        throw error;
    }
})

module.exports = router;