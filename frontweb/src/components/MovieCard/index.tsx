import { Movie } from 'types/movie';

import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {

  return (
    <div className="base-card movie-card-container">
      <div className="movie-img-container">
        <img className="movie-img" src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-name-description-container">
        <h3>{movie.title}</h3>
        <h6 className="text-primary">{movie.year}</h6>
        <p>{movie.subTitle ? movie.subTitle : 'Subtitulo'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
