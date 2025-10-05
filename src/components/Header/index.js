import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import logo from "../../assets/images/logo.png";
import "./header.css";

function Header() {
  const { signed, loadingAuth, user, Logout } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Carregando...</div>;
  }

  return (
    <header>
      <div className="netprime-logo">
        <Link to="/netprime">
          <img src={logo} alt="NetPrime Logo" className="header-logo-img" />
        </Link>
      </div>

      {signed ? (
        <div className="header-links">
          <Link className="favoritos" to="/favoritos">
            Meus Filmes
          </Link>

          <span className="user-name">{`Olá! ${user.name}`}</span>

          <button className="logout-btn" onClick={() => Logout()}>
            Sair
          </button>
        </div>
      ) : (
        <div className="header-links">
          <Link className="login-btn" to="/login">
            Entrar
          </Link>
          <Link className="favoritos" to="/login">
            Meus Filmes
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
