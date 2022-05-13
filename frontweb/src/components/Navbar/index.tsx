import { AuthContext } from 'AuthContext';
import { useContext, useEffect } from 'react';
import { getTokenData, isAuthenticated } from 'util/auth';
import history from 'util/history';
import { removeAuthData } from 'util/storage';
import './styles.css';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({ authenticated: false });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({ authenticated: false });
    history.replace('/');
  };

  return (
    <nav className="nav-container">
      <h3>MovieFlix</h3>
      {authContextData.authenticated && (
        <div className="logout-icon">
          <a href="#sair" onClick={handleLogoutClick}>
            Sair
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
