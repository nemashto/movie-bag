import { ActionType, Action } from "./types";
import { Dispatch } from 'redux'
import MovieServices from "../services/MovieServices";


export const retrieveMovies = () => async (dispatch: Dispatch<Action>) => {
    try {
            const response = await MovieServices.getAll()

            dispatch({
                type: ActionType.RETRIEVE_MOVIES,
                payload: response.data,
            })
    } catch (err) {
        console.log(err)
    }

}