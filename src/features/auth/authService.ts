import axios from 'axios';

const API_URL = 'api/users/';

//Register User
const register = async (userData: any) => {
    // console.log(userData);
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//Login User
const login = async (userData: any) => {
    // console.log(userData);
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// google sign in & sign up
const googleSignIn = async (userData: any) => {

    const response = await axios.post(API_URL + 'googlesignin', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = {
    register,
    login,
    logout,
    googleSignIn,
}

export default authService;