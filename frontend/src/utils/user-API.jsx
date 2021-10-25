import axios from 'axios'

export const loginUser = async (userData) => {
    console.log(userData);
    return await axios.post('http://localhost:8080/api/user/login', userData);
};

// SignUp
export const createUser = async (userData) => {
    console.log(userData);
    return await axios.post('http://localhost:8080/api/user/', userData);
}

// Get one user
export const getSingleUser = async (userData) => {
    console.log(userData);
    // return await axios.get(`http://localhost:8080/api/user/me/`);
}