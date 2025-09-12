import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

import "./movie.css";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`movie/${id}`, {
          params: {
            api_key: "fe693a701206cd78a2ef5e226304aebe",
            language: "pt-BR",
          },
        })
        .then((response) => {
          console.log(response.data);
          setMovie(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO!");
          navigate("/netprime", { replace: true });
        });
    }

    loadMovie();

    return () => {
      console.log("COMPONENTE DESMONTADO COM SUCESSO!");
    };
  }, [navigate, id]);

  function saveMovie() {
    const myList = localStorage.getItem("@netprime");

    let savedMovies = JSON.parse(myList) || [];

    const hasMovie = savedMovies.some(
      (savedMovies) => savedMovies.id === movie.id
    );

    if (hasMovie) {
      toast.warn("Esse filme já está na sua lista!");
      return;
    }

    savedMovies.push(movie);
    localStorage.setItem("@netprime", JSON.stringify(savedMovies));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filme...</h1>
      </div>
    );
  }

  return (
    <main className="filme-info">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
      />

      <h3>Sinopse:</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average.toFixed(1)} / 10</strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>

        <button>
          <a
            href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
            target="blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </main>
  );
}

export default Movie;
