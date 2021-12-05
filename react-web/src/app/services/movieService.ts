import http from "../../http-common"
import IMovieData from "../types/Movie"

const getAll = () => {
    return http.get<Array<IMovieData>>("/movies")
}

const get = (id: string) => {
    return http.get<Array<IMovieData>>(`/movies/${id}`)
}

const create = (data: IMovieData) => {
    return http.post<Array<IMovieData>>("/movies", data)
}

const update = (id: string, data: IMovieData) => {
    return http.put<Array<IMovieData>>(`/movies/${id}`, data)
}

const remove = (id: string) => {
    return http.delete<Array<IMovieData>>(`/movies/${id}`)
}

const removeAll  = () => {
    return http.delete<Array<IMovieData>>("/movies")
}

const findByTitle = (title: string  ) => {
    return http.get<Array<IMovieData>>(`/movies?title=${title}`)
}

const MovieDataService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
}

export default MovieDataService