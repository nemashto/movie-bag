import React from "react"
import { useParams } from 'react-router'

type MovieParams = {
    id: string
}

export const DetailMovie = () => {

    const {id} = useParams<MovieParams>()
    
    return(
        <div>
            {id}
        </div>
    )
}