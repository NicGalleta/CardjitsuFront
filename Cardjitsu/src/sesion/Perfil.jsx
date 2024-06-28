import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../common/navegacion/Navbar';
import Footer from '../common/navegacion/Footer';
import penguinImage from '../assets/penguin.png';

const colors = ['#FF0000', '#3434FF', '#008000', '#FFA500', '#800080', '#FFFF00', '#22FFFF', '#000000', '#ff6289'];

function Perfil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newColor, setNewColor] = useState('');
  const [updateError, setUpdateError] = useState(null);
  const userId = localStorage.getItem('user_id');

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/perfil`, {
        headers: {
          'user_id': userId
        }
      });
      setUserData(response.data);
    } catch (error) {
      setError(`Error fetching user: ${error.message}`);
    }
    setLoading(false);
  };

  const updateColor = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/perfil`, { color: newColor }, {
        headers: {
          'user_id': userId
        }
      });
      setUserData({ ...userData, color: newColor });
      window.location.href = "/perfil";
    } catch (error) {
      setUpdateError(`Error updating color: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="user-page">
        <h1>Información del Usuario</h1>
        {userData ? (
          <div>
            <p>Nombre: {userData.name}</p>
            <p>Email: {userData.mail}</p>
            <img src={penguinImage} alt="" style={{ width: '10%', height: '10%', backgroundColor: newColor }}></img>
            <form onSubmit={updateColor}>
              <button type="submit">Actualizar Color</button>
            </form>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px', justifyContent: "center"  }}>
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setNewColor(color)}
                  style={{
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    margin: '5px',
                    cursor: 'pointer'
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <p>No se encontraron datos del usuario.</p>
        )}
        <br />
        <a id="boton_simple" href="/">Volver</a>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
