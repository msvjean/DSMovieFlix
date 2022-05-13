import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "types/movie";
import { requestBackend } from "util/requests";


type UrlParams = {
    movieId: string;
}

const MovieDetails = () => {

    const { movieId} = useParams<UrlParams>();
    const [movie, setMovie] = useState<Movie>();

    useEffect(() => {
        const params: AxiosRequestConfig = {
          method: 'GET',
          url: "/movies/" + movieId,
          withCredentials: true,
        };
    
        requestBackend(params)
          .then((response) => {
            setMovie(response.data);
          })
          .finally(() => {
            
          });
      }, [movieId]);

    return <h1>{`Tela detalhes do filme "${movie?.title}" id: ${movie?.id}`}</h1>
}

export default MovieDetails;