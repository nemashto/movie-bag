export interface IMovieData {
    id: string,
    name: string,
    casts: string[],
    genres: string[],
}

export interface IMovieInputData {
    name: string,
    genres: string[],
    casts: string[],
}