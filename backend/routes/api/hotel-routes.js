const express = require('express');
const router = express.Router();

const { getAllHotels, getHotelById, getHotelByName, getHotelsByCity } = require('../../controller/hotel-controller');

 
// PATH:  /api/hotel/

router.get('/', async (req, res) => {
    try {
        const hotels = await getAllHotels();
        res.status(200).json(hotels);
    }catch(error){
        res.status(error.status).json(error.error);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const hotel = await getHotelById(req.params.id);
        console.log(hotel);
        res.status(200).json(hotel);
    }catch(error){
        res.status(error.status).json(error.error);
    }
});
router.get('/name/:name', async (req, res) => {
    try {
        const hotel = await getHotelByName(req.params.name);
        console.log(hotel);
        res.json(hotel);
    }catch(error){
        res.status(error.status).json(error.error);
    }
});
router.get('/city/:city', async (req, res) => {
    try {
        const hotels = await getHotelsByCity(req.params.city);
        console.log(hotels);
        res.json(hotels);
    }catch(error){
        res.status(error.status).json(error.error);
    }
});

module.exports = router;