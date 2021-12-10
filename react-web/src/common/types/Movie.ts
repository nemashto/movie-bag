export interface IMovieData {
    _id: object,
    name: string,
    casts: string[],
    genres: string[],
}

export interface IMovieInputData {
    name: string,
    genres: string[],
    casts: string[],
}