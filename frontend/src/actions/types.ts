import IMovieData from "../types/Movie"

export enum ActionType {
    RETRIEVE_MOVIES = 'RETRIEVE_MOVIES'
}

interface actionRetrieve{
    type: ActionType.RETRIEVE_MOVIES
    payload: IMovieData[]
}

export type Action = actionRetrieve