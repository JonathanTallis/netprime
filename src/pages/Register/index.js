import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../services/firebase/connection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "" || confirmPassword === "") {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(email)) {
      toast.error("Por favor, insira um endereço de e-mail válido!");
      return;
    }

    if (password.length < 6) {
      toast.warn("A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não são iguais");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //remover antes do deploy
      console.log(user);

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      toast.success("Cadastro realizado com sucesso!");
      navigate("/netprime");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "Este e-mail já está em uso. Por favor, faça login ou use outro e-mail."
        );
      } else if (error.code === "auth/invalid-email") {
        toast.error(
          "O formato do e-mail é inválido. Por favor, verifique e tente novamente."
        );
      } else if (error.code === "auth/weak-password") {
        toast.error("A senha é muito fraca. Use pelo menos 6 caracteres.");
      } else {
        console.log("Erro desconhecido ao cadastrar: ", error.message);
        toast.error(`Erro ao cadastrar: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-register">
      <h1>Netprime</h1>
      <span>Vamos criar sua conta!</span>

      <div className="register-data">
        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Senha com 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Aguarde..." : "Cadastre-se"}
          </button>
        </form>
      </div>

      <div className="login-info">
        <span>
          Já possui uma conta? <Link to="/login">Faça login!</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
