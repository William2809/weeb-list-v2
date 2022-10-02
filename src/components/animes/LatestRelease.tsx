
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getLatest, reset } from '../../features/gogoanime/gogoanimeSlice';
import { MdKeyboardArrowDown } from 'react-icons/md';
import AnimeItem from './AnimeItem';

function LatestRelease() {
    const { anime, isLoading, isSuccess } = useSelector((state: RootState) => state.gogoanime);
    const dispatch = useDispatch<any>();

    const [page, setPage] = useState(1);
    const [type, setType] = useState(1);
    const [animes, setAnimes]: any = useState([]);

    const [sub, setSub] = useState(true);
    const [dub, setDub] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            loadPage();
        }

        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        }
    }, [isSuccess, dispatch]);


    useEffect(() => {
        const url: any = {
            page: page,
            type: type,
        }
        dispatch(getLatest(url));
    }, [dispatch, page]);

    const loadPage = () => {
        setPage(page + 1);
        setAnimes([...animes, ...anime.results]);
    }

    useEffect(() => {
        setPage(1);
        setAnimes([]);
        dispatch(reset());
    }, [dub, sub])

    const subOrDub = (menu: number) => {
        if (menu === 1) {
            setSub(true);
            setDub(false);
            setType(1);
        }
        else if (menu === 2) {
            setSub(false);
            setDub(true);
            setType(2);
        }
    }

    return (
        <div className="pb-[100px]">
            <div className="flex pt-3 gap-2">
                <div onClick={() => subOrDub(1)} className={`flex justify-center items-center rounded-lg w-[60px] h-[32px]  text-white font-semibold text-[14px] ${sub ? "bg-primary" : ""} hover:bg-primary cursor-pointer`}>
                    Sub
                </div>
                <div onClick={() => subOrDub(2)} className={`flex justify-center items-center rounded-lg w-[60px] h-[32px]  text-white font-semibold text-[14px] ${dub ? "bg-primary" : ""} hover:bg-primary cursor-pointer`}>
                    Dub
                </div>
            </div>

            <div className=" mt-4 flex gap-2 xs:gap-4 flex-wrap justify-evenly">
                {animes && animes.map((anime: any) => (
                    <AnimeItem key={anime.id + anime.episodeNumber} anime={anime} subOrDub={type} />
                ))}
            </div>

            <div className="flex w-full justify-center mt-5">
                <button className="flex w-[120px] items-center bg-secondary rounded-md text-white font-medium text-sm px-3 py-1 hover:bg-secondary-focus" onClick={() => loadPage()}>
                    {isLoading ? "Loading..." : "Load More"}
                    <MdKeyboardArrowDown size="24px"></MdKeyboardArrowDown>
                </button>
            </div>

        </div>
    )
}

export default LatestRelease