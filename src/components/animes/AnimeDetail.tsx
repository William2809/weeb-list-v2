import Plyr from 'plyr';
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import { MdStar, MdTagFaces, MdKeyboardArrowDown } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { reset } from '../../features/auth/authSlice';
import { getAnimeDetails } from '../../features/anilist/anilistSlice';
import useWindowDimensions from '../../hooks/useWindowDimensions';

function AnimeDetail() {
    const [animeDesc, setAnimeDesc]: any = useState(null);
    const [nextEpisode, setNextEpisode]: any = useState(0);

    //url 
    const url = window.location.pathname;
    const lastUrl = url.substring(url.lastIndexOf("/") + 1, url.length);
    var id: string;
    if (lastUrl === "latest") {
        id = url.substring(url.lastIndexOf("anime/") + 6, url.lastIndexOf("/"));
    }
    else {
        id = lastUrl;
    }

    //get anime details from mal, anilist
    const { animeDetail, isLoading, isSuccess } = useSelector((state: RootState) => state.anilist);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (isSuccess) {
            setAnimeDesc([animeDetail[0].data, animeDetail[1]]);
            if (animeDetail[1].nextAiringEpisode) {
                setNextEpisode(animeDetail[1].nextAiringEpisode.airingTime * 1000);//set count down for next eps
            }
            console.log(animeDetail)
        }

        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        }
    }, [isSuccess, dispatch]);

    const getDetails = async () => {
        dispatch(getAnimeDetails(id));
    }

    const { width } = useWindowDimensions();

    // Random component
    const Completionist = () => <span>The series are completed!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{days}d {hours}h {minutes}m {seconds}s</span>;
        }
    }
    return (
        <div>
            {
                (width < 640) &&
                (<div>
                    {animeDesc &&
                        (<div className="px-2.5 mt-2">
                            <div className="text-neutral text-xl font-semibold">
                                Details
                            </div>
                            <div className="flex items-center mt-1">

                                <img src={animeDesc[0].images.jpg.image_url} alt="thumbnail" className=" h-[160px] rounded-lg mr-2" />
                                <div className="w-full">
                                    {nextEpisode !== 0 && (
                                        <div className="">
                                            <div className=" text-neutral font-medium">
                                                <div className=" text-xs">
                                                    Next: <Countdown
                                                        date={nextEpisode}
                                                        renderer={renderer}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex gap-4 mt-2">
                                        <div className="flex flex-col justify-center items-center w-[110px] h-[80px] bg-neutral-focus rounded-md">
                                            <div className="flex gap-2 items-center text-neutral text-2xl font-bold ">
                                                <MdStar size="32px" className="text-yellow-400"></MdStar>{animeDesc[0].score}
                                            </div>
                                            <div className="text-center font-semibold">
                                                <div className="text-white">
                                                    MAL
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex  flex-col justify-center items-center w-[110px] h-[80px] bg-neutral-focus rounded-md">
                                            <div className="flex gap-2 items-center text-neutral text-2xl font-bold">
                                                <MdTagFaces size="32px" className="text-yellow-400"></MdTagFaces>{animeDesc[1].rating}%
                                            </div>
                                            <div className="text-white font-semibold">
                                                Anilist
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex text-xs  items-center  ">
                                        <div className=" mt-4 py-1 px-3 flex gap-4 bg-neutral-focus rounded-md ">
                                            <div className="text-center">
                                                Members {animeDesc[0].members}
                                            </div>
                                            <div className="text-center">
                                                Popularity #{animeDesc[0].popularity}
                                            </div>
                                            <div className="text-center">
                                                Ranked #{animeDesc[0].rank}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                    {!animeDesc &&
                        (<div className="flex w-full justify-center mt-5">
                            <button className={`flex ${isLoading ? "w-[120px]" : "w-[140px]"} items-center bg-secondary rounded-md text-white font-medium text-sm px-3 py-1 hover:bg-secondary-focus justify-center gap-1 h-full`} onClick={() => getDetails()}>
                                {isLoading ? "Loading..." : "More Details"}
                                {!isLoading && <MdKeyboardArrowDown size="24px" className="" />}
                            </button>
                        </div>)
                    }

                </div>)

            }
        </div>
    )
}

export default AnimeDetail