import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';

function NewGame(){
    const [status, setStatus] = useState(null);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
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
            if (response.data.message === "Partida creada exitosamente"){
            console.log(response.data.partida_id)
            localStorage.setItem('partida_id', response.data.partida_id)
            console.log(response.data.jugador_id)
            localStorage.setItem('jugador_id', response.data.jugador_id)
            navigate('/board') /*IR A SALA DE ESPERA */
            }
          })
          .catch(error => {
            setStatus(error.message);
          });
      }, []);
    
      return (
        <div>
        {status}
        <br ></br>
        <a href="/">Volver</a>
        </div>
      );
}

export default NewGame