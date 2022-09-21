import AnimePlayer from '../components/animes/AnimePlayer';
import AnimeDetail from '../components/animes/AnimeDetail';

function Anime() {
    return (
        <div className="flex flex-col">
            <AnimePlayer />
            <AnimeDetail />
        </div >
    )
}

export default Anime