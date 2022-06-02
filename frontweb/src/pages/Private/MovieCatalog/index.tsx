import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const MovieCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        genreId: 0,
        page: 0,
        size: 4
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="listing-movie-container">
      <div className="row">
        {page?.content.map((movie) => (
          <div className="col-sm-6 col-xl-3" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <MovieCard movie={movie as Movie} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCatalog;
