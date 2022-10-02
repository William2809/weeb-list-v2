import axios from "axios";
const API_URL = process.env.REACT_APP_GOGO_API;

//get Popular anime
const getPopular = async (token: string, page: number) => {
    const config =
    {
        method: 'get',
        url: API_URL + 'popular?page=' + page,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios(config);
    return response.data;
}

//get Popular anime
const getMovie = async (token: string, page: number) => {
    const config =
    {
        method: 'get',
        url: API_URL + 'anime-movies?=' + page,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios(config);
    return response.data;
}

const gogoanimeApiService = {
    getPopular,
    getMovie
}

export default gogoanimeApiService;