import { Link } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';

function AnimeItem({ anime }: any) {

    const { width } = useWindowDimensions();


    const truncate = (str: string, max: number) => {
        return str.length > max ? str.substring(0, max) + " ..." : str;
    }

    return (
        <div>
            <a href={`/anime/${anime.id}/latest`}>
                <div className="w-[114px] h-[228px] xs:w-[136px]  xs:h-[272px] bg-base-200 rounded-lg" key={anime.id}>
                    <img src={anime.image} alt="" className="w-full h-[160px] xs:h-[204px] rounded-t-lg" />
                    <p className="font-semibold text-white text-2xs xs:text-xs text-center my-1 px-1">
                        {truncate(anime.title, width < 500 ? 24 : 30)}
                    </p>
                    <div className="flex font-semibold text-white text-xs gap-1 justify-center">
                        <div className="px-1 bg-secondary rounded-[4px]">
                            Eps {anime.episodeNumber}
                        </div>

                        <div className="px-1 bg-secondary rounded-[4px]">
                            Sub
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default AnimeItem;