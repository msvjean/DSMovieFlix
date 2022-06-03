import { AxiosRequestConfig } from 'axios';
import ReviewForm from 'components/ReviewForm';
import ReviewListing from 'components/ReviewListing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="movie-details-container">
      <div className="base-card movie-card-details-container">
        <div className="movie-img-container">
          <img
            className="movie-details-img"
            src={movie?.imgUrl}
            alt={movie?.title}
          />
        </div>
        <div className="movie-details-name-description-container">
          <h3>{movie?.title}</h3>
          <h6 className="text-primary">{movie?.year}</h6>
          <p>{movie?.subTitle ? movie.subTitle : 'Subtitulo'}</p>
          <div className="movie-synopsis-container">
            <p>{movie?.synopsis}</p>
          </div>
        </div>
      </div>

      {hasAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <div className="list-container base-card">
        <ReviewListing reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetails;
