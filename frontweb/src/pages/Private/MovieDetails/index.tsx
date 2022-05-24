import { AxiosRequestConfig } from 'axios';
import ButtonIcon from 'components/ButtonIcon';
import ReviewListing from 'components/ReviewListing';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';


import './styles.css';

type UrlParams = {
  movieId: string;
};

type FormData = {
  review: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [reviews, setReviews] = useState<Review[]>([]);

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

  const onSubmit = (formData: FormData) => {};

  return (
    <div className="movie-details-container">
      <div className="title-container">
        <h1>{`Tela detalhes do filme id: ${movieId}`}</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('review', {
                required: 'Campo obrigatório',
              })}
              type="text"
              className={`form-control base-input review-input ${
                errors.review ? 'is-invalid' : ''
              }`}
              placeholder="Deixe sua avaliação aqui"
              name="review"
            />
            <div className="invalid-feedback d-block div-error">
              {errors.review?.message}
            </div>
          </div>
          <div className="submit-review">
            <ButtonIcon text="SALVAR AVALIAÇÃO" />
          </div>
        </form>
      </div>
      <div className="list-container base-card">
       <ReviewListing reviews={reviews} />
      </div>
    </div>
  );
};

export default MovieDetails;
