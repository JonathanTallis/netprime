import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import "./header.css";

function Header() {
  const { signed, loadingAuth, user, Logout } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  return (
    <header>
      <Link className="logo" to="/netprime">
        <img src="logo.png" alt="NetPrime" />
      </Link>

      {signed ? (
        <div className="header-links">
          <Link className="favoritos" to="/favoritos">
            Meus Filmes
          </Link>

          <span className="user-email">{`Olá! ${user.name}`}</span>

          <button className="logout-btn" onClick={() => Logout()}>
            Sair
          </button>
        </div>
      ) : (
        <div className="header-links">
          <Link className="favoritos" to="/login">
            Meus Filmes
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
