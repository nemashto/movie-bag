import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { retrieveMovies } from "../actions/movies"
import { useTypeSelector } from "../hooks/useTypeSelector";
import IMovieData from "../types/Movie";
import { RootState } from '../reducers'

export function MovieList() {
    const [currentMovie, setCurrentMovie] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
  
    const movies = useSelector((state: RootState) => state.movies)
    const dispatch = useDispatch()

    useEffect(() => {
        async function loadData() {
            await dispatch(retrieveMovies());
        }
        loadData()
        
      }, [])

    console.log(movies)
    return (
        <div>
            <h1>
                Movie List
            </h1>
            <ul className="list-group">

            </ul>
        </div>
    )
}