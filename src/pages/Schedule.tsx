import { type } from '@testing-library/user-event/dist/types/setup/directApi';
import { getUnixTime, startOfToday } from 'date-fns'
import { endOfWeek } from 'date-fns/esm';
import startOfWeek from 'date-fns/startOfWeek'
import { useEffect, useState } from 'react';
import { getSchedule } from '../features/anilist/anilistSlice';
import fromUnixTime from 'date-fns/fromUnixTime'

function Schedule() {
    const [animeSchedule, setAnimeSchedule]: any = useState(null);

    const getAnimeSchedule = async (url: any) => {
        const result = await getSchedule(url);
        setAnimeSchedule(result.results);

        // const now: any = {
        //     airingAt: getUnixTime(new Date()),
        //     country: "JP"
        // }
        // console.log("current time " + now.time);

        // animeSchedule.push(now);
        // console.log(animeSchedule);
        // sortSchedule(animeSchedule);
        // console.log(animeSchedule);
        // console.log(animeSchedule[0].airingAt);
    }

    useEffect(() => {
        const url: any = {
            page: 1,
            perpage: 200,
            weekstart: getUnixTime(startOfWeek(new Date(startOfToday()))),
            weekend: getUnixTime(endOfWeek(new Date(startOfToday()))),
            notyetaired: "true",
        }
        getAnimeSchedule(url);
    }, [])

    // const date = startOfWeek(new Date(startOfToday()));
    const startDate = startOfWeek(new Date(startOfToday()));
    const endDate = endOfWeek(new Date(startOfToday()));
    // const date = startOfWeek(new Date(endOfWeek(startOfToday())), { weekStartsOn: 1 })
    // console.log(startDate);
    // console.log(endDate);

    const sortSchedule = (data: any) => {
        data = data.sort((a: any, b: any) => {
            if (a.airingAt < b.airingAt) {
                return -1;
            }
        });
        // console.log(data);

    }



    return (
        <div className="flex">
            <div>
                <div>
                    {animeSchedule?.map((anime: any, index: number) => (
                        (anime.country === "JP" &&
                            <div key={index} className="flex gap-2" >
                                <div>
                                    <img className="w-[100px] h[200px]" src={anime.image} alt="" />
                                </div>
                                <div>
                                    <div>Time:
                                        {fromUnixTime(anime.airingAt).toString()}
                                    </div>
                                    <div>
                                        Title: {anime.title.english}
                                    </div>
                                    <div>
                                        Episode: {anime.episode}
                                    </div>
                                    <div>
                                        index: {index}
                                    </div>
                                </div>
                            </div>
                        )

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Schedule