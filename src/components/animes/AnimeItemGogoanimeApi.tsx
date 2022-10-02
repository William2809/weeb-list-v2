import useWindowDimensions from '../../hooks/useWindowDimensions';

function AnimeItemGogoanimeApi({ anime }: any) {

    const { width } = useWindowDimensions();


    const truncate = (str: string, max: number) => {
        return str.length > max ? str.substring(0, max) + " ..." : str;
    }

    return (
        <div>
            <a href={`/anime/${anime.animeId}`}>
                <div className="w-[114px] h-[200px] xs:w-[136px]  xs:h-[256px] bg-base-200 rounded-lg" key={anime.animeId}>
                    <img src={anime.animeImg} alt="" className="w-full h-[160px] xs:h-[204px] rounded-t-lg" />
                    <p className="font-semibold text-white text-2xs xs:text-xs text-center my-1 px-1">
                        {truncate(anime.animeTitle, width < 500 ? 24 : 30)}
                    </p>
                </div>
            </a>
        </div>
    )
}

export default AnimeItemGogoanimeApi;