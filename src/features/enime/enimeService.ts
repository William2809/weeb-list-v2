import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/enime';

//get latest anime
const getAnimeDetails = async (token: string, title: string) => {
    const config =
    {
        method: 'get',
        url: API_URL + '/animedetails/' + title,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios(config);
    return response.data;
}

const enimeService = {
    getAnimeDetails,
}

export default enimeService;