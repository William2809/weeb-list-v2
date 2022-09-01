const gogoanimeReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'GET_LATEST':
            return {
                ...state,
                anime: action.payload,
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'SET_CLEAR':
            return {
                ...state,
                anime: [],
            }
        default:
            return state;
    }
}

export default gogoanimeReducer;