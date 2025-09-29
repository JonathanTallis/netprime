import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../services/firebase/connection";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./favorites.css";

function Favorites() {
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        try {
          const snapshot = await getDoc(userDocRef);

          if (snapshot.exists()) {
            setMovie(snapshot.data().favorites || []);
          }
        } catch (error) {
          console.log("Erro ao buscar favoritos:", error);
          toast.error("Não foi possível carregar seus favoritos.");
        } finally {
          setLoading(false);
        }
      }
    }

    loadFavorites();
  }, [user]);

  async function deleteMovie(id) {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const updatedFavorites = movie.filter((movie) => movie.id !== id);

      await updateDoc(userDocRef, {
        favorites: updatedFavorites,
      });

      setMovie(updatedFavorites);
      toast.success("Filme removido com sucesso!");
    } catch (error) {
      console.log("Erro ao deletar documento:", error);
    }
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
