import http from "../http-common"
import {IMovieData, IMovieInputData} from "../common/types/Movie"

const getAll = () => {
    return http.get<Array<IMovieData>>("/movies")
}

const get = (id: string) => {
    return http.get<IMovieData>(`/movies/${id}`)
}

const create = (data: IMovieInputData) => {
    return http.post<IMovieInputData>("/movies", data)
}

const update = (id: string, data: IMovieInputData) => {
    return http.put<IMovieData>(`/movies/${id}`, data)
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