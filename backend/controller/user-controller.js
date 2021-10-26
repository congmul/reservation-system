const { User } = require('../models');

const { signToken } = require('../libs/auth');

const getSingleUser = async (userInfo) => {
    // console.log(userInfo, "User Controller get Signle")
    try {
        const user = await User.find({username: userInfo.username}).populate('reservation');
        
        if (!user) {
            throw { message: 'Cannot find a user with this user!' };
          }
        
        return user;
    }catch(error) {
        throw error;
    }
}

const login = async (userInfo) => {
    try {
        const user = await User.findOne({ $or: [{ username: userInfo.username }, { email: userInfo.email }] });
        console.log(user);
        if (!user) {
            throw { message: "Can't find this user"};
          }
        
        const correctPw = await user.isCorrectPassword(userInfo.password);
        if (!correctPw) {
            throw 'Wrong password!';
          }
          const token = signToken(user);
          return ({ token, user });

    }catch(error) {
        throw error;
    }
}

const createUser = async (userInfo) => {
    try{
        console.log(userInfo);
        const user = await User.create(userInfo);

        console.log(user)

        if (!user) {
            throw { message: 'Something is wrong!' };
          }
          const token = signToken(user);

          console.log({ token, user })
          return ({ token, user });

    }catch(error){
        throw error;
    }
}

const updateUser = async (userInfo) => {
    try{
        console.log("userInfo in controller", userInfo);
        let user = await User.updateOne({'username': userInfo.username}, userInfo, { new: true })
        console.log(user);
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {
    getSingleUser,
    login,
    createUser,
    updateUser

}