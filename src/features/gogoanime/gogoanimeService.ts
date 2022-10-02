import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/gogoanime';

//get latest anime
const getLatest = async (token: string, page: number) => {
    const config =
    {
        method: 'get',
        url: API_URL + '/latest/' + page,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios(config);
    return response.data;
}

//get anime episode
const getAnimeInfo = async (token: string, id: string) => {
    const config2 =
    {
        method: 'get',
        url: API_URL + '/animeinfo/' + id,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios(config2);
    return response.data;
}

//get anime episode
const getAnimeEpisode = async (token: string, id: string) => {
    const config =
    {
        method: 'get',
        url: API_URL + '/episode/' + id,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios(config);
    return response.data;
}

//get anime by title
const getAnime = async (token: string, url: any) => {
    const { title, page } = url;
    const config =
    {
        method: 'get',
        url: API_URL + '/search/' + '?title=' + title + '&page=' + page,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios(config);
    return response.data;
}

const gogoanimeService = {
    getAnime,
    getLatest,
    getAnimeInfo,
    getAnimeEpisode,
}

export default gogoanimeService;