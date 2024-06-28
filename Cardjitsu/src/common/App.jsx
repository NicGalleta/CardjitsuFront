import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import senseiLogo from '../assets/sensei.png';
import Footer from './navegacion/Footer';
import { AuthContext } from "../auth/AuthContext";
import Navbar from './navegacion/Navbar'; // Asegúrate de que la ruta sea correcta
import Logo from '../assets/Logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const { token, logout } = useContext(AuthContext);
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/joinpartida`, {
      id_partida: codigo,
      id_usuario: localStorage.getItem('user_id')
    }).then((response) => {
      console.log(response.data.message);
      const newPartidaId = response.data.partida_id;
      localStorage.setItem('partida_id', newPartidaId);
      localStorage.setItem('jugador_id', response.data.jugador_id);
      navigate(`/salaespera/${newPartidaId}`);
      
    }).catch((error) => {
      console.error('An error occurred while trying to join this game:', error);
    });
  }

  const handleCreateGame = () => {
    axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_URL}/newgame`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: {
            id: localStorage.getItem('user_id')
        }
      })
      .then(response => {
          if (response.data.message === "Partida creada exitosamente") {
              const newPartidaId = response.data.partida_id;
              console.log(newPartidaId);
              localStorage.setItem('partida_id', newPartidaId);
              localStorage.setItem('jugador_id', response.data.jugador_id);
              navigate(`/salaespera/${newPartidaId}`);
          }
      })
      .catch(error => {
          console.error("Error creating game:", error.message);
      });
  };

  return (
    <>
      {token && <Navbar />}
      <div className="main-content">
        {token && <img src={senseiLogo} alt="Sensei Logo" className="sensei-logo" />}
        <br />
        <br />
        {token ? (
          <>
            <button id="boton_simple" onClick={handleCreateGame}>Crear Partida</button>
            <br />
            <form onSubmit={handleSubmit}>
              <label>
                ID de Partida:
              </label>
              <br />
                <input  
                  name="codigo"
                  value={codigo}
                  onChange={e => setCodigo(e.target.value)}
                  required
                />
              <br />
              <br />
              <button type="submit">Unirse a Partida</button>
            </form>
          </>
        ) : (
          <>
            <img src={Logo} alt="Logo" className="card-logo" />
            <br />
            <a id="login_button" href="/login">Login</a>
            <br />
            <br />
            <a id="signup_button" href="/signup">Sign Up</a>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;