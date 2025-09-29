import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../services/firebase/connection";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./movie.css";

function Movie() {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { signed, user } = useContext(AuthContext);
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

  async function saveMovie() {
    if (!signed) {
      toast.info("Faça login para salvar filmes!");
      return;
    }

    try {
      const userDocRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const userData = snapshot.data();
        const hasMovie = userData.favorites?.some(
          (movies) => movies.id === movie.id
        );

        if (hasMovie) {
          toast.info("Esse filme já está na sua lista!");
          return;
        }
      }

      await updateDoc(userDocRef, {
        favorites: arrayUnion({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }),
      });
      toast.success("Filme salvo na sua lista!");
    } catch (error) {
      console.log("Erro ao salvar o filme:", error);
      toast.error("Erro ao salvar o filme");
    }
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
