import AnimePlayer from '../components/animes/AnimePlayer';
import AnimeDetail from '../components/animes/AnimeDetail';
import useWindowDimensions from '../hooks/useWindowDimensions';



function Anime() {
    const { height, width } = useWindowDimensions();

    return (
        <div className={`flex flex-col`}>
            <AnimePlayer />
            <AnimeDetail />
        </div >
    )
}

export default Anime