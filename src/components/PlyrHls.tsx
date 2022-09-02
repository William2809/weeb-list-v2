import React from 'react'
import { useEffect, useRef } from "react";

import "plyr-react/plyr.css";
import Hls from "hls.js";
import Plyr, { APITypes, PlyrProps, PlyrInstance } from "plyr-react";

function PlyrHls(props: any) {
    const ref = useRef<APITypes>(null);
    const urlEpisode = props.url;

    useEffect(() => {
        console.log("test");
        console.log(props.url);
        const loadVideo = async () => {
            const video = document.getElementById("plyr") as HTMLVideoElement;
            var hls = new Hls();
            console.log(urlEpisode);
            hls.loadSource(urlEpisode);
            hls.attachMedia(video);
            console.log("enter");
            // @ts-ignore
            // ref.current!.plyr.media = video;

            const defaultOptions: any = {};



            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                // (ref.current!.plyr as PlyrInstance).pause();
                video.pause();
                // Transform available levels into an array of integers (height values).
                const availableQualities = hls.levels.map((l: any) => l.height)

                // Add new qualities to option
                defaultOptions.quality = {
                    default: availableQualities[0],
                    options: availableQualities,
                    // this ensures Plyr to use Hls to update quality level
                    // Ref: https://github.com/sampotts/plyr/blob/master/src/js/html5.js#L77
                    forced: true,
                    // onChange: (e:any) => updateQuality(e),
                }
            });
        };
        loadVideo();
    }, []);
    const option = {

    }

    return (
        <div className="w-[500px] h-[280px]">
            <Plyr
                id="plyr"
                options={{
                    volume: 0.1,
                    clickToPlay: true,
                    hideControls: true,
                    autoplay: false,

                }}
                source={{} as PlyrProps["source"]}
                ref={ref}

            />
        </div>
    );
}


export default PlyrHls