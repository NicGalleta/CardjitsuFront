import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './color.css';

function Login() {
  const { token, setToken } = useContext(AuthContext);
  const { myid, setMyid } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email: email,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        setMyid(response.data.id)
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('token', access_token);
        setToken(access_token);
        console.log("Se seteo el token: ", token);

        // Redirige al usuario a la página principal "/"
        window.location.href = "/";
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
      })

  };


  return (
    <div className="Login">
      <h1>Login</h1>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br></br>
        <label>
          Password:
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        <input type="submit" value="Enviar" style={{ width: '40%' }}/>
      </form>
      
      <a href="/signup">SignUp</a>
      <br></br>
      <a href="/">Volver</a>
    </div>
  );
}

export default Login;
