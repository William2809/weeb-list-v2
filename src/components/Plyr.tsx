import Hls from "hls.js";
import PlyrJS, { Options, PlyrEvent as PlyrJSEvent } from "plyr";
import React, { HTMLProps, MutableRefObject, useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

export type PlyrInstance = PlyrJS;
export type PlyrEvent = PlyrJSEvent;
export type PlyrCallback = (this: PlyrJS, event: PlyrEvent) => void;

export type PlyrProps = HTMLProps<HTMLVideoElement> & {
    source?: any;
    options?: Options;
};
export interface HTMLPlyrVideoElement {
    plyr?: PlyrInstance;
}

export const Plyr = React.forwardRef<HTMLPlyrVideoElement, PlyrProps>(
    (props, ref) => {
        const { options = null, source, ...rest } = props;
        const innerRef = useRef<HTMLPlyrVideoElement>();
        const hls = useRef(new Hls());

        const videoOptions: PlyrJS.Options = {
            ...options,
            quality: {
                default: 1080,
                options: [1080],
            },
        };

        const createPlayer = () => {
            const plyrPlayer = new PlyrJS(".plyr-react", videoOptions);

            if (innerRef.current?.plyr) {
                innerRef.current.plyr = plyrPlayer;
            }
        };

        hls.current.on(Hls.Events.MANIFEST_LOADED, () => {
            videoOptions.quality = {
                default: hls.current.levels[hls.current.levels.length - 1].height,
                options: hls.current.levels.reverse().map((level: any) => (
                    level.height
                )),
                forced: true,
                // Manage quality changes
                onChange: (quality: number) => {
                    hls.current.levels.forEach((level: any, levelIndex: any) => {
                        if (level.height === quality) {
                            hls.current.currentLevel = levelIndex;
                        }
                    });
                },
            };

            createPlayer();
        });

        useEffect(() => {
            if (!innerRef.current) return;

            if (Hls.isSupported()) {
                hls.current.loadSource(source!);
                // hls.current.loadSource(source ? source! : source!);
                hls.current.attachMedia(innerRef.current as HTMLMediaElement);
            } else {
                createPlayer();
            }

            if (typeof ref === "function") {
                if (innerRef.current) ref(innerRef.current);
            } else {
                if (ref && innerRef.current) ref.current = innerRef.current;
            }

            if (innerRef.current?.plyr && source) {
                innerRef.current.plyr.source = source;
            }

            innerRef.current.plyr?.on("play", () => hls.current.startLoad());

            innerRef.current.plyr?.on("qualitychange", () => {
                if (innerRef.current?.plyr?.currentTime !== 0) {
                    hls.current.startLoad();
                }
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [videoOptions]);

        return (
            <video
                ref={innerRef as unknown as MutableRefObject<HTMLVideoElement>}
                className="plyr-react plyr w-full"
                {...rest}
            />
        );
    }
);