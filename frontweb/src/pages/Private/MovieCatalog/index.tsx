import './styles.css';

const MovieCatalog = () => {
  return (
    <div className="listing-movie-container">
      <div>
        <h1>Tela listagem de filmes</h1>
        <br />
        <br />
      </div>
      <div>
          <a href="/movies/1">Acessar /movies/1</a>
          <br />
          <a href="/movies/2">Acessar /movies/2</a>
      </div>
    </div>
  );
};

export default MovieCatalog;
