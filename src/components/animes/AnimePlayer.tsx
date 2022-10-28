import React, { useEffect, useState } from 'react'
import { MdPlayCircle } from 'react-icons/md';
import { getAnimeEpisodeGogo, getAnimeInfo } from '../../features/gogoanime/gogoanimeSlice';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Plyr from '../Plyr';
import { checkUrl } from './idCornerCase';
import { getAnimeEpisodeAnimix } from '../../features/animix/animixSlice';

function AnimePlayer() {

    const [gogoInfo, setGogoInfo]: any = useState([]);//info from gogoanime
    const [episodeLists, setEpisodeLists]: any = useState([]);//eps from gogoanime
    const [genres, setGenres]: any = useState(null);

    const [loadPlayer, setLoadPlayer]: any = useState(false);
    const [episodes, setEpisodes]: any = useState(null);
    const [external, setExternal]: any = useState(null);

    const [externalActive, setExternalActive]: any = useState(false);

    const [activeSource, setActiveSource]: any = useState("gogo");

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

    //check any id mistakes
    const correction = checkUrl(id);
    if (correction !== "-1") {
        id = correction;
    }

    //function get episode from gogoanime
    const getEpisodeList = async () => {
        var data = await getAnimeInfo(id);
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
        const epsGogo = await getAnimeEpisodeGogo(episodeId);
        const epsAnimix = await getAnimeEpisodeAnimix(episodeId);
        setExternal(epsGogo.headers.Referer);
        // console.log(epsGogo);
        // console.log(epsAnimix);
        setEpisodes([epsGogo, epsAnimix]);
    }
    // active episode or current episodes
    const activeEpisode: any = (number: number) => {
        var newArr = [...episodeLists];
        // console.log(newArr);
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

    useEffect(() => {
        getEpisodeList();
    }, []);

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
                                {!externalActive && loadPlayer && episodes && <Plyr source={`${activeSource === "gogo" ? episodes[0].sources[0].url : episodes[1].sources[0].file}`} />}
                                {/* {externalActive && } */}
                            </div>
                        </div>
                        {/* external player */}
                        <div className={`${externalActive ? "" : "hidden"} `}>
                            {external && <iframe className="w-full h-[360px]" src={external}></iframe>}
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
                                <button className={` ${activeSource === "gogo" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("gogo") }}>Gogoanime</button>
                                <button className={`${activeSource === "animix" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("animix") }}>Animix</button>

                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-[6px] px-2.5  overflow-y-auto h-[76px]">
                            {episodeLists && episodeLists.map((episode: any) => (
                                <div key={episode.id} className={`w-[54px] h-[30px]  text-white font-semibold text-lg flex items-center justify-center rounded-md cursor-pointer  ${episode.active ? 'bg-secondary-focus' : 'bg-secondary'}`} onClick={() => activeEpisode(episode.number)} >
                                    {episode.number}
                                </div>
                            ))}
                        </div>
                        <div className="pl-2">
                            {!externalActive &&
                                <div className="py-2">
                                    To download the episode, please switch to external player.
                                </div>
                            }
                            <div>
                                <button className="bg-secondary rounded-lg hover:bg-secondary-focus py-2 px-4 text-white" onClick={() => { setExternalActive(!externalActive); setLoadPlayer(true) }}>Switch to External</button>
                            </div>

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
                                {!externalActive && loadPlayer && episodes && <Plyr source={`${activeSource === "gogo" ? episodes[0].sources[0].url : episodes[1].sources[0].file}`} />}
                                {/* {externalActive && } */}
                            </div>
                        </div>
                        {/* external player */}
                        <div className={`${externalActive ? "" : "hidden"} `}>
                            {external && <iframe className="w-full md:h-[500px] lg:h-[700px] xl:h-[1080px]" src={external}></iframe>}
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
                                <button className={` ${activeSource === "gogo" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("gogo") }}>Gogoanime</button>
                                <button className={`${activeSource === "animix" ? "bg-secondary-focus" : "bg-secondary"} text-white hover:bg-secondary-focus rounded-lg py-2 px-4`} onClick={() => { setActiveSource("animix") }}>Animix</button>

                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-[6px] px-2.5  overflow-y-auto h-[76px]">

                            {episodeLists && episodeLists.map((episode: any) => (
                                <div key={episode.id} className={`w-[54px] h-[30px]  text-white font-semibold text-lg flex items-center justify-center rounded-md cursor-pointer  ${episode.active ? 'bg-secondary-focus' : 'bg-secondary'}`} onClick={() => activeEpisode(episode.number)} >
                                    {episode.number}
                                </div>
                            ))}
                        </div>

                        <div className="pl-2">
                            {!externalActive &&
                                <div className="py-2">
                                    To download the episode, please switch to external player.
                                </div>
                            }
                            <div>
                                <button className="bg-secondary rounded-lg hover:bg-secondary-focus py-2 px-4 text-white" onClick={() => { setExternalActive(!externalActive); setLoadPlayer(true) }}>Switch to External</button>
                            </div>

                        </div>
                    </div>
                </div>)}

        </div>
    )
}

export default AnimePlayer