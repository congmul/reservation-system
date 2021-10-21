const { User } = require('../models');

const getUser = async () => {
    try {
        const response = await User.find({});
        return response;
    }catch(error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const response = await User.find({"_id": id});
        return response;
    }catch(error) {
        throw error;
    }
}

module.exports = {
    getUser,
    getUserById

}