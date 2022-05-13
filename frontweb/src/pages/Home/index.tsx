import Login from 'components/Login';
import { ReactComponent as HomeImg } from 'assets/images/home-image.svg';

import './styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <HomeImg />
      </div>
      <div className="home-login-container">
        <Login />
      </div>
    </div>
  );
};
export default Home;
