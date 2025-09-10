import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./favorites.css";

function Favorites() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@netprime");
    setMovie(JSON.parse(myList) || []);
  }, []);

  function deleteMovie(id) {
    let movieFilter = movie.filter((item) => {
      return item.id !== id;
    });

    setMovie(movieFilter);
    localStorage.setItem("@netprime", JSON.stringify(movieFilter));
    toast.success("Filme excluído com sucesso!");
  }

  return (
    <div className="my-movies">
      <h1>Meus Filmes</h1>

      {movie.length === 0 && <span>Você não possui filmes salvos 😢</span>}

      <ul>
        {movie.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => deleteMovie(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorites;
