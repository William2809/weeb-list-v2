import { json } from 'body-parser';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
// import PlyrHls from '../components/PlyrHls';
import { getAnimeInfo, getAnimeEpisode } from '../features/gogoanime/gogoanimeSlice';
import { Plyr } from '../components/Plyr';

function Anime() {

    const [gogoInfo, setGogoInfo]: any = useState([]);//info from gogoanime
    const [episodeLists, setEpisodeLists]: any = useState([]);//eps from gogoanime
    const [episodes, setEpisodes]: any = useState(null);

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
            if (lastUrl === "latest" && item.number === data.episodes[data.episodes.length - 1].number) {
                item.active = true;
                getEpisodeSource(item.id);
                // console.log(item.id);
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
        console.log(eps.sources[0].url);
        setEpisodes(eps);
    }

    // active episode or current episodes
    const activeEpisode: any = (number: number) => {
        var newArr = [...episodeLists];
        console.log("test2");
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



    return (

        <div className="flex flex-col items-center">
            <div className="w-[500px] h-[280px] bg-secondary">
                {/* {episodes && <PlyrHls url={episodes.sources[0].url} />} */}
                {episodes && <Plyr source={episodes.sources[0].url}></Plyr>}
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

            {/* {episodes &&
                <div>
                    {episodes}
                </div>
            } */}

        </div>
    )
}

export default Anime