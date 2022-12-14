import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/anilist';

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

// const page = req.query.page;
//     const perPage = req.query.perpage;
//     const weekStart = req.query.weekstart;
//     const weekEnd = req.query.weekend;
//     const notYetAired = req.query.notairedyet;

//get schedule
const getSchedule = async (token: string, url: any) => {
    const { page, perpage, weekstart, weekend, notyetaired } = url;
    // console.log("page= " + page + " type= " + type)
    // console.log(page, perpage, weekstart, weekend, notyetaired);
    const config =
    {
        method: 'get',
        url: API_URL + '/schedule/' + '?page=' + page + '&perpage=' + perpage + '&weekstart=' + weekstart + '&weekend=' + weekend + '&notyetaired=' + notyetaired,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios(config);
    return response.data;
}

const anilistService = {
    getAnimeDetails,
    getSchedule,
}

export default anilistService;