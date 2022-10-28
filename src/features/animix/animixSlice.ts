import animixService from "./animixService";

// get anime episode
export const getAnimeEpisodeAnimix = async (id: string) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);

        const token = user.token;
        return await animixService.getAnimeEpisode(token, id);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}

