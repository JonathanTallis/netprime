import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../services/firebase/connection";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(email)) {
      toast.error("Por favor, insira um endereço de e-mail válido!");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      //remover antes do deploy
      console.log(user);

      setEmail("");
      setPassword("");

      navigate("/netprime");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("Nenhum usuário encontrado com este e-mail!");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Senha incorreta. Por favor, tente novamente.");
      } else {
        console.log("Erro desconhecido ao fazer login:", error.message);
        toast.error(`Erro ao fazer login: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-login">
      <h1>Netprime</h1>

      <div className="login-data">
        <form onSubmit={handleLogin}>
          <label>E-mail:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Aguarde..." : "Entrar"}
          </button>
        </form>
      </div>

      <div className="register-info">
        <span>
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
