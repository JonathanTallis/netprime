import { useState, useEffect, createContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase/connection";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        loadUserData(currentUser);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function loadUserData(firebaseUser) {
    const userDocRef = doc(db, "users", firebaseUser.uid);

    const snapshot = await getDoc(userDocRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: data.name,
      });
    } else {
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      });
    }
    setLoadingAuth(false);
  }

  async function Logout() {
    try {
      await signOut(auth);
      console.log("Usuário desconectado com sucesso!");
      setUser(null);

      toast.info("Até breve!");
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
      toast.error("Não foi possível fazer logout. Tente novamente!");
    }
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loadingAuth, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
