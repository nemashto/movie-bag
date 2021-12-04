import { ActionType , Action } from "../actions/types";
import IMovieData from "../types/Movie"

interface State {
    movies: IMovieData[];
    loading: boolean;
    error: string | null;
}

const initialState = {
    movies: [],
    loading: false, 
    error: null 
}

export const movieReducer = (state: State = initialState, action: Action):State => {
    switch(action.type) {
        case ActionType.RETRIEVE_MOVIES:
            return {
                error: null,
                loading: false,
                movies: action.payload
            }
        default:
            return state
    }
}