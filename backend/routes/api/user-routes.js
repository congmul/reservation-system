const express = require('express');
const router = express.Router();

const { getUser } = require('../../controller/user-controller');

// PATH:  /api/user/

router.get('/', async (req, res) => {
    try {
        const response = await getUser();
        console.log(response);
        res.json(response);
    }catch(error){
        throw error;
    }
});



module.exports = router;