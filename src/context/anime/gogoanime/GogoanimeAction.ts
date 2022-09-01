import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user')!);

const gogoanime = axios.create({
    baseURL: '/api/gogoanime',
    headers: { Authorization: `Bearer ${user.token}` },
})

export const getLatest = async () => {
    console.log("get latest");
    console.log(user.token);
    const response = await gogoanime.get('/latest');
    return response.data;
}