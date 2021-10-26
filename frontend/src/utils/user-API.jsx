import axios from 'axios'


const baseURL = process.env.REACT_APP_BASE_URL || `http://localhost:8080/api/`

const api = axios.create({
    baseURL
})

export const loginUser = async (userData) => {
    console.log(userData);
    return await api.post('/user/login', userData);
};

// SignUp
export const createUser = async (userData) => {
    console.log(userData);
    return await api.post('/user/', userData);
}

// Get one user
export const getSingleUser = async (userData, token) => {
    // console.log(token);
    return await api.get(`/user/me/`,{ 
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
            }
        }
    );
}

// Get one user
export const updateUser = async (userData) => {
    console.log(userData);
    return await api.put('/user/', userData);
}

// export const loginUser = async (userData) => {
//     console.log(userData);
//     return await axios.post('http://localhost:8080/api/user/login', userData);
// };

// // SignUp
// export const createUser = async (userData) => {
//     console.log(userData);
//     return await axios.post('http://localhost:8080/api/user/', userData);
// }

// // Get one user
// export const getSingleUser = async (userData, token) => {
//     // console.log(token);
//     return await axios.get(`http://localhost:8080/api/user/me/`,{ 
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${token}`
//             }
//         }
//     );
// }