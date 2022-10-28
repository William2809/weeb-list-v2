import axios from "axios";
const API_URL = process.env.REACT_APP_ANIMIX_API;

//get anime episode
const getAnimeEpisode = async (token: string, id: string) => {
    const config =
    {
        method: 'get',
        url: API_URL + 'animix/watch/' + id,
    }
    const response = await axios(config);
    return response.data;
}
const animixService = {

    getAnimeEpisode,
}

export default animixService;