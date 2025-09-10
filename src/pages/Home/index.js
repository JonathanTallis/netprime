import { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [nowplaying, setNowplaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlaying() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "fe693a701206cd78a2ef5e226304aebe",
          language: "pt-BR",
          page: 1,
        },
      });

      console.log(response.data.results.slice(0, 14));
      setNowplaying(response.data.results.slice(0, 14));
      setLoading(false);
    }

    loadPlaying();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="nowplaying-list">
        {nowplaying.map((movie) => {
          return (
            <article key={movie.id}>
              <Link to={`/filme/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <Link to={`/filme/${movie.id}`}>
                <strong>{movie.title}</strong>
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
