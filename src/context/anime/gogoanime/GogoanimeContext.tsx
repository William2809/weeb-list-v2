// import Gogoanime from "@consumet/extensions/dist/providers/anime/gogoanime";
import { createContext, useReducer } from "react";
import gogoanimeReducer from "./GogoanimeReducer";

interface Anime {
    currentPage: number,
    hasNextPage: boolean,
    results?: [] | null,
}

const GogoanimeContext = createContext<Anime | null>(null);

export const GogoanimeProvider = ({ children }: any) => {
    console.log("Test");
    const initialState = {
        anime: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(gogoanimeReducer, initialState);

    return <GogoanimeContext.Provider value={{
        ...state,
        dispatch,
    }}>
        {children}
    </GogoanimeContext.Provider>
}

export default GogoanimeContext;