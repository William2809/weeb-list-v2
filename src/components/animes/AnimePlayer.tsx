import { useEffect, useState } from 'react'
import { getAnimeEpisodeGogo, getAnimeInfo } from '../../features/gogoanime/gogoanimeSlice';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Plyr from '../Plyr';
import { getAnimeEpisodeAnimix, getAnimeSeriesAnimix, getAnimeIdAnimix, getAnimeInfoAnimix } from '../../features/animix/animixSlice';
import { useNavigate } from 'react-router-dom';

import { MdPlayCircle } from 'react-icons/md';
import { RiStarSFill } from 'react-icons/ri';

function AnimePlayer() {

    const [gogoInfo, setGogoInfo]: any = useState([]);//info from gogoanime
    const [episodeLists, setEpisodeLists]: any = useState([]);//eps from gogoanime
    const [genres, setGenres]: any = useState(null);

    const [loadPlayer, setLoadPlayer]: any = useState(false);
    const [episodes, setEpisodes]: any = useState(null);

    const [activeSource, setActiveSource]: any = useState("animix");
    const [malId, setMalId]: any = useState(null);

    //series
    const [series, setSeries]: any = useState(null);

    const { width, height } = useWindowDimensions();

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
        var data = await getAnimeInfo(id);
        var animixEpisode = await getAnimeIdAnimix(id);
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

        var series = await getAnimeSeriesAnimix(animixEpisode.mal_id);

        setEpisodeLists(data.episodes);
        setMalId(animixEpisode.mal_id)
        setSeries(series);
    }

    const getEpisodeSource = async (episodeId: string) => {
        const epsGogo = await getAnimeEpisodeGogo(episodeId);
        const epsAnimix = await getAnimeEpisodeAnimix(episodeId);
        setEpisodes([epsGogo, epsAnimix]);
    }

    // active episode or current episodes
    const activeEpisode: any = (number: number) => {
        var newArr = [...episodeLists];
        newArr.forEach((item: any) => {
            item.active = false;
            if (item.number === number) {
                getEpisodeSource(item.id);
                item.active = true;
            }
        })
        setEpisodeLists(newArr);
    }

    //click play to load player
    const clickPlayButton = () => {
        setLoadPlayer(true);
    }

    const navigate = useNavigate();

    const navigateTo = async (id: string) => {
        const animeInfo = await getAnimeInfoAnimix(id);
        if (animeInfo.animeId) {
            navigate(`/anime/${animeInfo.animeId}`);
        }
    }

    useEffect(() => {
        getEpisodeList();
    }, [navigate]);


    return (
        <div>
            {(width <= 640 || height <= 500) &&
                (<div>
                    <div>
                        <div className={`${loadPlayer ? "bg-base-100 w-full min-h-min " : "bg-base-200 w-full h-[240px]"} flex items-center justify-center`}>
                            {loadPlayer === false &&
                                (<div className=" flex flex-col items-center">
                                    <MdPlayCircle size="48px" className="text-neutral active:text-primary" onClick={() => clickPlayButton()} />
                                    <p className="pt-1">Load Player</p>
                                </div>)
                            }
                            <div>
                                {loadPlayer && episodes && <Plyr source={`${activeSource === "gogo" ? episodes[0].sources[0].url : episodes[1].sources}`} />}
                            </div>
                        </div>
                        {gogoInfo.length !== 0 &&
                            (<div className="px-2.5 pt-2">
                                <div className="text-white font-bold text-2xl">
                                    {gogoInfo.title}
                                </div>
                                <div className="flex justify-between text-neutral font-medium">
                                    <div>
                                        {gogoInfo.status} | {gogoInfo.subOrDub} | {gogoInfo.totalEpisodes} Eps
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

                        <div className="mt-4 px-2 flex items-center">
                            <div className="text-lg font-medium">
                                Episode Sources
                            </div>
                            <div className="pl-2 flex gap-3">
                                <button className={`${activeSource === "animix" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("animix") }}>Animix</button>
                                <button className={` ${activeSource === "gogo" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("gogo") }}>Gogoanime</button>

                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-[6px] px-2.5  overflow-y-auto h-[76px]">
                            {episodeLists && episodeLists.map((episode: any) => (
                                <div key={episode.id} className={`w-[54px] h-[30px]  text-white font-semibold text-lg flex items-center justify-center rounded-md cursor-pointer  ${episode.active ? 'bg-secondary-focus' : 'bg-secondary'}`} onClick={() => activeEpisode(episode.number)} >
                                    {episode.number}
                                </div>
                            ))}
                        </div>

                        <div>
                            {series?.message === true &&
                                <div className='mt-1'>
                                    <div className="px-2 text-white font-semibold text-lg sm:text-xl md:text-2xl">
                                        {series.title}
                                    </div>
                                    <div className='mt-1 flex flex-wrap gap-[6px]   overflow-y-auto h-[240px]'>
                                        {series.series.map((anime: any, i: number) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`cursor-pointer w-full group flex mx-2 gap-2 my-1 p-2 hover:bg-secondary rounded-xl ${anime.id === parseInt(malId) ? 'bg-slate-600' : ''}`}
                                                    onClick={() => { navigateTo(anime.id) }}
                                                >
                                                    <div className='flex-shrink-0'>
                                                        <img className="w-[70px] h-[100px] rounded-lg" src={anime.image_url} alt="" />
                                                    </div>
                                                    <div className='flex flex-col justify-between'>
                                                        <div >
                                                            <div className=" md:text-lg text-sm font-semibold text-white">
                                                                <span className="text-primary">[ {anime.type} ]</span> {anime.title}
                                                            </div>

                                                            <div className="mt-1 md:text-lg text-sm font-medium text-neutral flex gap-2 items-center">
                                                                <div className='px-2 pt-[2px] pb-[2px] border-[2px] border-primary rounded-xl text-sm flex gap-1 items-center'>
                                                                    <RiStarSFill size="16" className="text-yellow-400 " /> {anime.score / 100}
                                                                </div>

                                                                <div className='px-2 pt-[2px] pb-[2px] border-[2px] border-primary rounded-xl text-sm'>
                                                                    {anime.episodes} Episode{anime.episodes > 1 ? "s" : ""}
                                                                </div>
                                                            </div>
                                                            <div className="mt-1 md:text-ms text-xs font-normal text-neutral">
                                                                {anime.type === "TV" ? `Aired from ${anime.time}` : `Aired at ${anime.time}`}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm font-semibold text-white">
                                                            {anime.id === parseInt(malId) && 'Currently Watching'}
                                                        </div>
                                                    </div>
                                                </div>)
                                        })}
                                    </div>
                                </div>

                            }
                        </div>

                    </div>
                </div>)}


            {(width > 640 && height > 500) &&
                (<div>
                    <div>
                        <div className={`${loadPlayer ? "bg-base-100 w-full min-h-min " : "bg-base-200 w-full h-[360px]"} flex items-center justify-center`}>
                            {loadPlayer === false &&
                                (<div className=" flex flex-col items-center">
                                    <MdPlayCircle size="48px" className="text-neutral active:text-primary" onClick={() => clickPlayButton()} />
                                    <p className="pt-1">Load Player</p>
                                </div>)
                            }
                            <div>
                                {loadPlayer && episodes && <Plyr source={`${activeSource === "gogo" ? episodes[0].sources[0].url : episodes[1].sources}`} />}
                            </div>
                        </div>
                        {gogoInfo.length !== 0 &&
                            (<div className="px-2.5 pt-2">
                                <div className="text-white font-bold text-2xl">
                                    {gogoInfo.title}
                                </div>
                                <div className="flex justify-between text-neutral font-medium">
                                    <div>
                                        {gogoInfo.status} | {gogoInfo.subOrDub} | {gogoInfo.totalEpisodes} Eps
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

                        <div className="mt-4 px-2 flex items-center">
                            <div className="text-lg font-medium">
                                Episode Sources
                            </div>
                            <div className="pl-2 flex gap-3">
                                <button className={`${activeSource === "animix" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("animix") }}>Animix</button>
                                <button className={` ${activeSource === "gogo" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("gogo") }}>Gogoanime</button>

                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-[6px] px-2.5  overflow-y-auto h-[76px]">

                            {episodeLists && episodeLists.map((episode: any) => (
                                <div key={episode.id} className={`w-[54px] h-[30px]  text-white font-semibold text-lg flex items-center justify-center rounded-md cursor-pointer  ${episode.active ? 'bg-secondary-focus' : 'bg-secondary'}`} onClick={() => activeEpisode(episode.number)} >
                                    {episode.number}
                                </div>
                            ))}
                        </div>

                        <div>
                            {series?.message === true &&
                                <div className='mt-1'>
                                    <div className="px-2 text-white font-semibold text-lg sm:text-xl md:text-2xl">
                                        {series.title}
                                    </div>
                                    <div className='mt-1 flex flex-wrap gap-[6px]   overflow-y-auto h-[240px]'>
                                        {series.series.map((anime: any, i: number) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className={`cursor-pointer w-full group flex mx-2 gap-2 my-1 p-2 hover:bg-secondary rounded-xl ${anime.id === parseInt(malId) ? 'bg-slate-600' : ''}`}
                                                    onClick={() => { navigateTo(anime.id) }}
                                                >
                                                    <div className='flex-shrink-0'>
                                                        <img className="w-[70px] h-[100px] rounded-lg" src={anime.image_url} alt="" />
                                                    </div>
                                                    <div className='flex flex-col justify-between'>
                                                        <div >
                                                            <div className=" md:text-lg text-sm font-semibold text-white">
                                                                <span className="text-primary">[ {anime.type} ]</span> {anime.title}
                                                            </div>

                                                            <div className="mt-1 md:text-lg text-sm font-medium text-neutral flex gap-2 items-center">
                                                                <div className='px-2 pt-[2px] pb-[2px] border-[2px] border-primary rounded-xl text-sm flex gap-1 items-center'>
                                                                    <RiStarSFill size="16" className="text-yellow-400 " /> {anime.score / 100}
                                                                </div>

                                                                <div className='px-2 pt-[2px] pb-[2px] border-[2px] border-primary rounded-xl text-sm'>
                                                                    {anime.episodes} Episode{anime.episodes > 1 ? "s" : ""}
                                                                </div>
                                                            </div>
                                                            <div className="mt-1 md:text-ms text-xs font-normal text-neutral">
                                                                {anime.type === "TV" ? `Aired from ${anime.time}` : `Aired at ${anime.time}`}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm font-semibold text-white">
                                                            {anime.id === parseInt(malId) && 'Currently Watching'}
                                                        </div>
                                                    </div>
                                                </div>)
                                        })}
                                    </div>
                                </div>

                            }
                        </div>

                    </div>
                </div>)}

        </div>
    )
}

export default AnimePlayer