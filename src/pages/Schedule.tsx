import { parseISO, format, isToday, formatISO } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom';
import { useGetScheduleQuery } from '../features/livechart/livechartService';
import { getAnimeInfoAnimix } from '../features/animix/animixSlice';
import { useEffect, useState } from 'react';
import Clock from 'react-live-clock';

function Schedule() {
    const { data, isSuccess, isLoading, error }: any = useGetScheduleQuery();
    const navigate = useNavigate();
    const [todayAnime, setTodayAnime]: any = useState([]);

    // let todayAnime: any = [];

    const sortSchedule = (data: any) => {
        data = data.sort((a: any, b: any) => {
            if (parseISO(a.time) < parseISO(b.time)) {
                return -1;
            }
        });
        // console.log(data);
        // data.map((schedule: any, i: any) => {
        //     console.log(parseISO(schedule.time));
        // })
        // if (todayAnime !=== []) {
        // setTodayAnime(data);
        // }
        // todayAnime = data;
        return data;
    }

    const mergeSchedule = (data: any) => {
        setTodayAnime(data);
    }

    useEffect(() => {
        if (data) {

            //add current time
            const current = {
                'time': formatISO(new Date),
                'timeless': true,
            }

            const merged = [...data.days[0].timeslots, current];
            if (isSuccess) {
                mergeSchedule(sortSchedule(merged));
            }
        }
    }, [isSuccess]);


    const navigateTo = async (url: string) => {
        const lastUrl = url.substring(url.lastIndexOf("/") + 1, url.length);
        const animeInfo = await getAnimeInfoAnimix(lastUrl);
        navigate(`/anime/${animeInfo.animeId}`);
    }

    // 
    // console.log(current);
    // data.days[0].timeslots.push()
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    return <div className='pb-[100px]'>
        <div className='flex flex-wrap justify-between'>
            {data.days?.map((day: any, i: number) => {
                const day_name = format(parseISO(day.beginning_of_day), 'cccc');
                if (i === 0) {
                    // // setTodayAnime(data.days[0]);
                    // todayList.push(data?.day[0]);
                    // console.log(todayList);
                }
                return (
                    <div className='w-[450px]'>
                        {(i == 0 ?
                            <div key={i}>
                                <div className="text-2xl text-white font-bold m-2 ml-4">{day_name} | {day.date}</div>

                                {todayAnime.map((animes: any, j: number) => {

                                    if (animes.timeless) {
                                        return (
                                            <div className='mx-2 bg-secondary p-2 rounded-xl text-white'>
                                                Now <Clock format={'h:mm:ss A'} ticking={true} />
                                            </div>
                                        )
                                    }

                                    const image = animes?.episodes[0]?.anime?.poster_image;
                                    const time = format(parseISO(animes.time), 'pp');
                                    const title = animes?.episodes[0]?.anime?.romaji_title
                                    const malUrl = animes?.episodes[0]?.anime?.mal_url;

                                    return (
                                        <Link className='group flex mx-2 gap-2 my-1 p-2 hover:bg-secondary rounded-xl' key={j} onClick={() => navigateTo(malUrl)} to={''}>
                                            <div className='flex-shrink-0'>
                                                <img className="w-[50px] h[100px] rounded-lg" src={image} alt="" />
                                            </div>
                                            <div className=''>
                                                <div className=" md:text-lg text-sm font-semibold text-white">
                                                    {title}
                                                </div>
                                                <div className='text-base text-neutral font-normal group-hover:text-white'>
                                                    {time}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                            :
                            <div key={i}>
                                <div className="text-2xl text-white font-bold m-2 ml-4">{day_name} | {day.date}</div>

                                {day.timeslots?.map((animes: any, j: number) => {
                                    const image = animes?.episodes[0]?.anime?.poster_image;
                                    const time = format(parseISO(animes.time), 'pp');
                                    const title = animes?.episodes[0]?.anime?.romaji_title
                                    const malUrl = animes?.episodes[0]?.anime?.mal_url;


                                    return (
                                        <Link className='group flex mx-2 gap-2 my-1 p-2 hover:bg-secondary rounded-xl' key={j} onClick={() => navigateTo(malUrl)} to={''}>
                                            <div className='flex-shrink-0'>
                                                <img className="w-[50px] h[100px] rounded-lg" src={image} alt="" />
                                            </div>
                                            <div>
                                                <div className="md:text-lg text-sm font-semibold text-white">
                                                    {title}
                                                </div>
                                                <div className='text-base text-neutral font-normal group-hover:text-white'>
                                                    {time}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
}

export default Schedule