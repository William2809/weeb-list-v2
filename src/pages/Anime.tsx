import { json } from 'body-parser';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getAnimeInfo, getAnimeEpisode } from '../features/gogoanime/gogoanimeSlice';

import Plyr from 'plyr';
const player = new Plyr('#player');

function Anime() {

    const [gogoInfo, setGogoInfo]: any = useState([]);//info from gogoanime
    const [episodeLists, setEpisodeLists]: any = useState([]);//eps from gogoanime
    const [episodes, setEpisodes] = useState([]);

    //url 
    const url = window.location.pathname;
    const lastUrl = url.substring(url.lastIndexOf("/") + 1, url.length);
    var id: string;
    if (lastUrl === "latest") {
        id = url.substring(url.lastIndexOf("e/") + 2, url.lastIndexOf("/"));
    }
    else {
        id = lastUrl;
    }

    //function
    const getEpisodeList = async () => {
        var data = await getAnimeInfo(id)
        setGogoInfo(data);

        //set all eps into unactive and activate last episode
        data.episodes.forEach((item: any) => {
            item['active'] = false;
            if (item.number === data.episodes[data.episodes.length - 1].number) {
                item.active = true;
            }
        })

        setEpisodeLists(data.episodes);
    }

    const getEpisodeSource = async (episodeId: string) => {
        const eps = await getAnimeEpisode(episodeId);
        setEpisodes(eps);
    }

    // active episode or current episodes
    const activeEpisode: any = (number: number) => {
        var newArr = [...episodeLists];

        newArr.forEach((item: any) => {
            item.active = false;
            if (item.number === number) {
                item.active = true;
            }
        })
        setEpisodeLists(newArr);
    }


    useEffect(() => {
        getEpisodeList();
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="w-[500px] h-[280px] bg-secondary">
                player

            </div>
            <div className="px-2.5">
                <div className="text-neutral font-bold text-2xl">
                    {gogoInfo && gogoInfo.title}
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-[6px] px-2.5">

                {episodeLists && episodeLists.map((episode: any) => (
                    <div key={episode.id} className={`w-[54px] h-[30px]  text-white font-semibold text-lg flex items-center justify-center rounded-md cursor-pointer  ${episode.active ? 'bg-secondary-focus' : 'bg-secondary'}`} onClick={() => activeEpisode(episode.number)} >
                        {episode.number}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Anime