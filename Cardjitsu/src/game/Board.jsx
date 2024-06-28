import './Board.css';
import BG from '../assets/CJW_bg.webp';
import React, { useState, useEffect, createContext, useRef } from 'react';
import Cell from './Cell';
import MovePad from './MovePad';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



export const BoardContext = createContext();

function Board(){
    const rows = 7;
    const cols = 5;
    const navigate = useNavigate();

    const colorToName = {
        '#FF0000': 'rojo',
        '#3434FF': 'azul',
        '#008000': 'verde',
        '#FFA500': 'naranja',
        '#800080': 'morado',
        '#FFFF00': 'amarillo',
        '#22FFFF': 'cyan',
        '#000000': 'negro',
        '#ff6289': 'rosado',
    };
    const [log1, setLog1] = useState("");
    const log2 = useRef("")
    const log3 = useRef("")
    const [version, setVersion] = useState(0);


    const [player1_x, setPlayer1_x] = useState(null);
    const [player1_y, setPlayer1_y] = useState(null);
    const [colorp1, setColorp1] = useState(null);
    const [stylep1, setStylep1] = useState(null);
    const [namep1, setNamep1] = useState(null);

    const [player2_x, setPlayer2_x] = useState(null);
    const [player2_y, setPlayer2_y] = useState(null);
    const [colorp2, setColorp2] = useState(null);
    const [stylep2, setStylep2] = useState(null);
    const [namep2, setNamep2] = useState(null);

    const [player3_x, setPlayer3_x] = useState(null);
    const [player3_y, setPlayer3_y] = useState(null);
    const [colorp3, setColorp3] = useState(null);
    const [stylep3, setStylep3] = useState(null);
    const [namep3, setNamep3] = useState(null);

    const [Turno, setTurno] = useState(null)

    const renderCells = () => {
        let cells = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                cells.push(<Cell key={`${row}-${col}`} row={Math.abs(6-row)} col={col} />);
            }
        }
        return cells;
    };
    
    useEffect(()=>{
        const colorName = colorToName[colorp1];
        const backgroundImageUrl = `/src/assets/sprite_penguin_${colorName}.png`;
        setStylep1({
            backgroundImage: `url(${backgroundImageUrl})`});
        
        console.log(stylep1);
    },[colorp1])
    
    useEffect(()=>{
        const colorName = colorToName[colorp2];
        const backgroundImageUrl = `/src/assets/sprite_penguin_${colorName}.png`;
        setStylep2({
            backgroundImage: `url(${backgroundImageUrl})`,
        });
    },[colorp2]);

    useEffect(()=>{
        const colorName = colorToName[colorp3];
        const backgroundImageUrl = `/src/assets/sprite_penguin_${colorName}.png`;
        setStylep3({
            backgroundImage: `url(${backgroundImageUrl})`,
        });
    },[colorp3])


    useEffect(() => {
        if (localStorage.getItem('jugador_id') === null){
            setMsg("No se ha creado una partida. Login y cree partida.");
            return(
                <a href="/login">Login</a>
            );
        }
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/fetchpartida`, {
            id: localStorage.getItem('partida_id')
          }).then((response) => {
            
                setPlayer1_x(response.data.jugador1.pos_x);
                setPlayer1_y(response.data.jugador1.pos_y);
                setPlayer2_x(response.data.jugador2.pos_x);
                setPlayer2_y(response.data.jugador2.pos_y);
                setPlayer3_x(response.data.jugador3.pos_x);
                setPlayer3_y(response.data.jugador3.pos_y);

                setColorp1(response.data.jugador1.color);
                setColorp2(response.data.jugador2.color);
                setColorp3(response.data.jugador3.color);
                
                setNamep1(response.data.jugador1.username);
                setNamep2(response.data.jugador2.username);
                setNamep3(response.data.jugador3.username);
            return;
          }).catch((error) => {
            console.error('An error occurred:', error);
          })
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            //fetch data partida
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/fetchpartida`, {
                id: localStorage.getItem('partida_id')
              }).then((response) => {
                console.log(response.data.partida.estado)
                if (response.data.partida.estado == "Abandonada"){
                    clearInterval(interval);
                    Swal.fire({
                        title: 'La partida ha sido abandonada',
                        text: 'Lo sentimos, un jugador abandonó la partida y será penalizado. De todas formas, ganarás puntos y XP por esta partida.',
                        icon: 'warning',
                        showCancelButton: false,
                        confirmButtonText: 'Volver a Inicio',
                      }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.removeItem('jugador_id');
                            localStorage.removeItem('partida_id');
                            navigate('/');
                      }});
                      return;
                }
                if (response.data.partida.estado == "Active_Cardjitsu"){
                    clearInterval(interval);
                    navigate('/cardjitsuboard');
                    return;
                }

                setPlayer1_x(response.data.jugador1.pos_x);
                setPlayer1_y(response.data.jugador1.pos_y);
                setPlayer2_x(response.data.jugador2.pos_x);
                setPlayer2_y(response.data.jugador2.pos_y);
                setPlayer3_x(response.data.jugador3.pos_x);
                setPlayer3_y(response.data.jugador3.pos_y);

                if (response.data.partida.turno == localStorage.getItem('jugador_id')){
                    setTurno("Es tu turno!!");
                }
                else if (response.data.partida.turno === response.data.jugador1.id_jugador){
                    setTurno("Turno de " + response.data.jugador1.username);
                }
                else if (response.data.partida.turno === response.data.jugador2.id_jugador){
                    setTurno("Turno de "+response.data.jugador2.username);
                }
                else if (response.data.partida.turno === response.data.jugador3.id_jugador){
                    setTurno("Turno de "+response.data.jugador3.username);
                }

              }).catch((error) => {
                console.error('An error occurred:', error);
              })
        }, 7000); 
    
        return () => clearInterval(interval);
    }, []);

    const handleabandonar = () => {
        Swal.fire({
            title: '¿Seguro que deseas abandonar la partida?',
            text: 'Si abandonas la partida, el resto de los jugadores no podrán continuar jugando. Además, se te dará una advertencia por abandonar la partida. Muchas advertencias pueden resultar en una suspensión de tu cuenta.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Abandonar',
            cancelButtonText: 'Seguir jugando',
          }).then((result) => {
            if (result.isConfirmed) {
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
            } 
          });
    };


    return (
        <div className='general'>
        <h2>{Turno}</h2>
        <div className="log-container">
            <p className="log-message">{log3.current} <br/>{log2.current} <br/> ↪ {log1}</p>
        </div>
        <BoardContext.Provider value={{ setVersion, log1, setLog1, log2, log3, player1_x, player1_y, player2_x, player2_y, player3_x, player3_y, stylep1, stylep2, stylep3, namep1, namep2, namep3}}>
        <div className="board-container" style={{ backgroundImage: `url(${BG})`}}>
            <div className="board">
                {renderCells()}
            </div>
            <MovePad></MovePad>
        </div>
        </BoardContext.Provider>
        <a onClick={handleabandonar} className="link-button">Abandonar Partida</a>
        </div>
    );
};

export default Board;
