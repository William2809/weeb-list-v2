import { Link } from 'react-router-dom';

function AnimeItem({ anime }: any) {
    const truncate = (str: string) => {
        const max = 30;
        return str.length > max ? str.substring(0, max) + " ..." : str;
    }

    return (
        <div>
            <Link to={`/anime/${anime.id}/latest`}>
                <div className="w-[136px] h-[272px] bg-base-200 rounded-lg" key={anime.id}>
                    <img src={anime.image} alt="" className="w-full h-[204px] rounded-t-lg" />
                    <p className="font-semibold text-white text-xs text-center my-1 px-1">
                        {truncate(anime.title)}
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
            </Link>
        </div>
    )
}

export default AnimeItem;