const { User } = require('../models');

const getUser = async () => {
    try {
        const response = await User.find({});
        return response;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    getUser,

}