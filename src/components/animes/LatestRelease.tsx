
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import testImg from '../../assets/coverImage/lycoris.jpg';
import { getLatest, reset } from '../../features/gogoanime/gogoanimeSlice';
import { MdKeyboardArrowDown } from 'react-icons/md';
import AnimeItem from './AnimeItem';

function LatestRelease() {
    const { anime, isLoading, isSuccess } = useSelector((state: RootState) => state.gogoanime);
    const dispatch = useDispatch<any>();

    const [page, setPage] = useState(1);
    const [animes, setAnimes]: any = useState([]);

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
        dispatch(getLatest(page));
    }, [dispatch, page]);

    const loadPage = () => {
        setPage(page + 1);
        setAnimes([...animes, ...anime.results]);
    }
    return (
        <div className="pb-[100px]">
            <div className=" mt-4 flex gap-2 xs:gap-4 flex-wrap justify-evenly">
                {animes && animes.map((anime: any) => (
                    <AnimeItem key={anime.id + anime.episodeNumber} anime={anime} />
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