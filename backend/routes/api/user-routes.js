const express = require('express');
const router = express.Router();

const { getUser, getUserById } = require('../../controller/user-controller');

// PATH:  /api/user/

router.get('/', async (req, res) => {
    try {
        const response = await getUser();
        res.json(response);
    }catch(error){
        throw error;
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await getUserById(req.params.id);
        res.json(response);
    }catch(error){
        throw error;
    }
});



module.exports = router;