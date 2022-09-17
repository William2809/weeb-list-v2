import { useEffect, useState } from 'react'
import { Plyr } from '../components/Plyr';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { MdKeyboardArrowDown, MdPlayCircle, MdStar, MdTagFaces } from 'react-icons/md';
import { getAnimeInfo, getAnimeEpisode } from '../features/gogoanime/gogoanimeSlice';
import { getAnimeDetails, reset } from '../features/enime/enimeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';

import { useCountdown } from '../hooks/useCountdown';
import { useRef } from 'react';

function Anime() {

    const [gogoInfo, setGogoInfo]: any = useState([]);//info from gogoanime
    const [episodeLists, setEpisodeLists]: any = useState([]);//eps from gogoanime
    const [episodes, setEpisodes]: any = useState(null);
    const [loadPlayer, setLoadPlayer]: any = useState(false);
    const [animeDesc, setAnimeDesc]: any = useState(null);
    const [genres, setGenres]: any = useState(null);
    const [nextEpisode, setNextEpisode]: any = useState(0);

    // const [days, hours, minutes, seconds]: any = useCountdown(nextEpisode);

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


    //function get episode from gogoanime
    const getEpisodeList = async () => {
        var data = await getAnimeInfo(id)
        setGogoInfo(data);
        setGenres(data.genres);
        //set all eps into unactive and activate last episode
        data.episodes.forEach((item: any) => {
            item['active'] = false;
            if (lastUrl === "latest" && item.number === data.episodes[data.episodes.length - 1].number) {
                item.active = true;
                getEpisodeSource(item.id);
            }
            else if (lastUrl !== "latest" && item.number === data.episodes[0].number) {
                item.active = true;
                getEpisodeSource(item.id);
            }
        })

        setEpisodeLists(data.episodes);
    }

    const getEpisodeSource = async (episodeId: string) => {
        const eps = await getAnimeEpisode(episodeId);
        console.log(eps);
        setEpisodes(eps);
    }

    //get anime details from enime, mal, anilist
    const { animeDetail, isLoading, isSuccess } = useSelector((state: RootState) => state.enime);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (isSuccess) {
            setAnimeDesc([animeDetail[0].data, animeDetail[1]]);
            if (animeDetail[1].nextAiringEpisode) {
                setNextEpisode(animeDetail[1].nextAiringEpisode.airingTime);//set count down for next eps
            }
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

    // active episode or current episodes
    const activeEpisode: any = (number: number) => {
        var newArr = [...episodeLists];
        console.log(newArr);
        newArr.forEach((item: any) => {
            item.active = false;
            if (item.number === number) {
                getEpisodeSource(item.id);
                item.active = true;
            }
        })
        setEpisodeLists(newArr);
    }


    useEffect(() => {
        getEpisodeList();
    }, []);

    const { width } = useWindowDimensions();

    //click play to load player
    const clickPlayButton = () => {
        setLoadPlayer(true);
    }


    // { animeDesc && CountdownTimer(animeDesc[1].nextAiringEpisode.airingTime * 1000) }

    return (
        <div className="flex flex-col items-center">
            {
                (width < 640) &&
                (<div>
                    <div>
                        <div className={`${loadPlayer ? "bg-base-100 w-screen min-h-min " : "bg-base-200 w-screen h-[240px]"} flex items-center justify-center`}>
                            {/* {episodes && <PlyrHls url={episodes.sources[0].url} />} */}
                            {loadPlayer === false &&
                                (<div className=" flex flex-col items-center">
                                    <MdPlayCircle size="48px" className="text-neutral active:text-primary" onClick={() => clickPlayButton()} />
                                    <p className="pt-1">Load Player</p>
                                </div>)
                            }
                            {/* {episodes && episodes.sources[0].url} */}
                            {loadPlayer && episodes && <Plyr source={episodes.sources[0].url} />}
                        </div>

                        {!animeDesc && gogoInfo.length !== 0 &&
                            (<div className="px-2.5 pt-2">
                                <div className="text-white font-bold text-2xl">
                                    {gogoInfo.title}
                                </div>
                                <div className="flex justify-between text-neutral font-medium">
                                    <div>
                                        {gogoInfo.status} | {gogoInfo.subOrDub} | {gogoInfo.totalEpisodes} Eps
                                    </div>
                                    <div>
                                        {/* {days > 0 && `${days}d`} {hours > 0 && `${hours}h`} {minutes && `${minutes}m`} {(days > 0 || hours > 0 || minutes > 0 || seconds > 0) && `${seconds}s`} */}
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-2 flex-wrap">
                                    {genres && genres.map((item: any, index: any) => (
                                        <div key={index} className="px-2 pt-[2px] pb-[4px] border-[2px] border-primary rounded-xl text-neutral font-medium text-sm">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>)
                        }

                        <div className="mt-4 flex flex-wrap gap-[6px] px-2.5  overflow-y-auto h-[76px]">

                            {episodeLists && episodeLists.map((episode: any) => (
                                <div key={episode.id} className={`w-[54px] h-[30px]  text-white font-semibold text-lg flex items-center justify-center rounded-md cursor-pointer  ${episode.active ? 'bg-secondary-focus' : 'bg-secondary'}`} onClick={() => activeEpisode(episode.number)} >
                                    {episode.number}
                                </div>
                            ))}
                        </div>
                    </div>
                    {animeDesc &&
                        (<div className="px-2.5">
                            <div className="flex items-center">
                                {gogoInfo &&
                                    (<img src={gogoInfo.image} alt="thumbnail" className=" h-[160px] rounded-lg mr-2" />)
                                }
                                <div className="w-full">
                                    <div className="pt-2">
                                        <div className="text-white font-bold text-2xl">
                                            {gogoInfo.title}
                                        </div>
                                        <div className=" text-neutral font-medium">
                                            <div className="text-sm">
                                                {gogoInfo.status} | {gogoInfo.subOrDub} | {gogoInfo.totalEpisodes} Eps
                                            </div>
                                            {animeDetail[1].nextAiringEpisode !== undefined &&
                                                <div className="mt-1 text-xs">
                                                    {/* <span className="text-primary">Next: </span> {days > 0 && `${days}d`} {hours > 0 && `${hours}h`} {minutes && `${minutes}m`} {(days > 0 || hours > 0 || minutes > 0 || seconds > 0) && `${seconds}s`} */}
                                                </div>
                                            }
                                        </div>
                                        <div className="flex gap-2 pt-2 flex-wrap">
                                            {genres && genres.map((item: any, index: any) => (
                                                <div key={index} className="px-2 pt-[2px] pb-[4px] border-[2px] border-primary rounded-lg text-neutral font-medium text-xs">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-evenly gap-4 mt-2">
                                        <div className="flex flex-col  justify-center items-center w-[110px] h-[80px] bg-neutral-focus rounded-md">
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
                                </div>
                            </div>
                            {/* {animeDesc[0].mal_id} */}

                        </div>)
                    }
                    {!animeDesc &&
                        (<div className="flex w-full justify-center mt-5">
                            <button className="flex w-[120px] items-center bg-secondary rounded-md text-white font-medium text-sm px-3 py-1 hover:bg-secondary-focus justify-center" onClick={() => getDetails()}>
                                {isLoading ? "Loading..." : "More Details"}
                                {!isLoading && <MdKeyboardArrowDown size="24px"></MdKeyboardArrowDown>}
                            </button>
                        </div>)
                    }

                </div>)

            }
        </div >
    )
}

export default Anime