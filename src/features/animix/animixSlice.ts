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

//get anime by malid
export const getAnimeInfoAnimix = async (id: string) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);

        const token = user.token;
        return await animixService.getAnimeInfo(token, id);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}

//get anime series by malid
export const getAnimeSeriesAnimix = async (id: string) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);

        const token = user.token;
        return await animixService.getAnimeSeriesAnimix(token, id);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}

//get anime episode list and animeid by malid
export const getAnimeIdAnimix = async (id: string) => {
    try {
        const user = JSON.parse(localStorage.getItem('user')!);

        const token = user.token;
        return await animixService.getAnimeIdAnimix(token, id);
    } catch (error: any) {
        const message: String = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return message;
    }
}
