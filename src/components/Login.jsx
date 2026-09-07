import { useState } from "react";
import { FiUser } from "react-icons/fi";
// import { useAuth } from "../context/useAuth";
import React, { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";


const Login = () => {
//   const { login, register, loginAsGuest } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const { login, register, loginAsGuest} = useContext(AuthProvider.Context);
  const handleSubmit = async () => {
    setError("");
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>{isRegister ? "Kayıt Ol" : "Giriş Yap"}</h1>

      <input
        type="email"
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      {error && <p className="login-error">{error}</p>}

      <button className="login-btn" onClick={handleSubmit}>
        {isRegister ? "Kayıt Ol" : "Giriş Yap"}
      </button>

      <button
        className="login-link"
        onClick={() => setIsRegister((p) => !p)}
      >
        {isRegister ? "Zaten hesabın var mı? Giriş yap" : "Hesabın yok mu? Kayıt ol"}
      </button>

      <div className="login-divider">veya</div>

      <button className="guest-btn" onClick={loginAsGuest}>
        <FiUser /> Misafir olarak devam et
      </button>
    </div>
  );
};

export default Login;