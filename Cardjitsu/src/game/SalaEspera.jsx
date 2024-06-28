import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './SalaEspera.css';

function SalaEspera() {
    const [status, setStatus] = useState("Esperando a que se unan los jugadores...");
    const [jugadorId, setJugadorId] = useState(localStorage.getItem('jugador_id') || null);
    const [jugador1Details, setJugador1Details] = useState(null);
    const [jugador2Details, setJugador2Details] = useState(null);
    const [jugador3Details, setJugador3Details] = useState(null);
    const [partidaId, setPartidaId] = useState(null);
    const { token } = useContext(AuthContext);
    const { partida_id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (partida_id) {
            setPartidaId(partida_id);
            fetchPartidaDetails(partida_id);
            const intervalId = setInterval(() => fetchPartidaDetails(partida_id), 5000); // Poll every 5 seconds
            return () => clearInterval(intervalId); // Cleanup on unmount
        } else {
            setStatus("No partida ID provided");
        }
    }, [partida_id]);

    const fetchPartidaDetails = async (partidaId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/fetchpartida`, { id: partidaId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { partida, jugador1, jugador2, jugador3 } = response.data;
            setJugador1Details(jugador1);
            setJugador2Details(jugador2);
            setJugador3Details(jugador3);
        } catch (error) {
            console.error('An error occurred while trying to fetch partida details:', error);
        }
    };

    const handleabandonar = () => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/abandonar`, {
            id_partida: localStorage.getItem('partida_id'),
            id_jugador: localStorage.getItem('jugador_id')
          }).then((response) => {
            localStorage.removeItem('jugador_id');
            localStorage.removeItem('partida_id');
            navigate('/');
          }).catch((error) => {
            console.error('An error occurred:', error);
          }); 
    };

    useEffect(() => {
        if (jugador1Details && jugador2Details && jugador3Details) {
            // Check if none of the players id are null
            if (jugador1Details.id_jugador && jugador2Details.id_jugador && jugador3Details.id_jugador) { 
                setStatus("Iniciando partida...");
                setLoading(true);
                const timeoutId = setTimeout(() => {
                    axios.post(`${import.meta.env.VITE_BACKEND_URL}/startpartida`, {
                        id: localStorage.getItem('partida_id')
                      }, {
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      }).then((response) => {
                            navigate('/board');
                      }).catch((error) => {
                            console.error('An error occurred while trying to fetch partida details:', error);
                      });
                }, 7000);
                return () => clearTimeout(timeoutId);
            }
        }
    }, [jugador1Details, jugador2Details, jugador3Details]);

    return (
        <div className="sala-espera">
            <h1>Sala de Espera {partidaId}</h1>
            <a onClick={handleabandonar} className="link-button">Abandonar Partida</a>
            <p>{status}</p>
            {loading && <div className="progress-5"></div>}
            <div className="jugador">Creador: {jugador1Details ? jugador1Details.username : 'Esperando...'}</div>
            <div className="jugador">Jugador 2: {jugador2Details ? jugador2Details.username : 'Esperando...'}</div>
            <div className="jugador">Jugador 3: {jugador3Details ? jugador3Details.username : 'Esperando...'}</div>
            <p className="status">La partida iniciara automaticamente con 3 jugadores...</p>
        </div>
    );
}

export default SalaEspera;