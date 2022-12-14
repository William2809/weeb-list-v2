import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = process.env.REACT_APP_LIVECHART_API;

export const livechartApi = createApi({
    reducerPath: 'livechartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: (builder) => ({
        getSchedule: builder.query<any, string>({ query: (date) => `/timetable?date=${date}` }),
    })
})

export const {
    useGetScheduleQuery
} = livechartApi;

// //get schedule from livechart
// const getSchedule = async () => {
//     const config =
//     {
//         method: 'get',
//         url: API_URL,
//     }
//     const response = await axios(config);
//     return response.data;
// }

// const livechartService = {
//     getSchedule
// }

// export default livechartService;