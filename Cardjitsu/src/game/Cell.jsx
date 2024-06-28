import React, { useState,useEffect, useContext } from 'react';
import { BoardContext } from './Board';
import './Board.css';
import axios from 'axios';

import normal from '../assets/cellimage3.png';
import agua from '../assets/cellimageagua.png';
import fuego from '../assets/cellimagefuego.png';
import nieve from '../assets/cellimagenieve.png';


function Cell({ row, col }) {
    const { setMsg } = useContext(BoardContext);
    const { player1_x, player1_y } = useContext(BoardContext);
    const { player2_x, player2_y } = useContext(BoardContext);
    const { player3_x, player3_y } = useContext(BoardContext);
    const {stylep1, stylep2, stylep3} = useContext(BoardContext);
    const {namep1, namep2, namep3} = useContext(BoardContext);
    const [player, setPlayer] = useState({backgroundImage: 'none'});
    const [celltype, setCelltype] = useState({backgroundImage: `url(${normal})`});
    const [pname, setPname] = useState();

    useEffect(() => {
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/tipocasilla`, {
            id_partida: localStorage.getItem('partida_id'),
            pos_x: row,
            pos_y: col
          }).then((response) => {
            if (response.data.tipo === "normal"){
                return;
            } else if (response.data.tipo === "agua"){
                setCelltype({backgroundImage: `url(${agua})`});
                return;
            } else if (response.data.tipo === "fuego"){
                setCelltype({backgroundImage: `url(${fuego})`});
                return;
            } else if (response.data.tipo === "nieve"){
                setCelltype({backgroundImage: `url(${nieve})`});
                return;
            }
            return;
          }).catch((error) => {
            console.error('An error occurred:', error);
          })
    }, []);



    useEffect(() => {
        if (row === player1_x && col === player1_y) {
            setPlayer(stylep1);
            setPname(namep1);
        }
        else if (row === player2_x && col === player2_y) {
            setPlayer(stylep2);
            setPname(namep2);
        }
        else if (row === player3_x && col === player3_y) {
            setPlayer(stylep3);
            setPname(namep3);
        }
        else {
            setPlayer({backgroundImage: 'none'});
            setPname("");

        }
        
    }, [player1_x, player1_y, player2_x, player2_y, player3_x, player3_y, stylep1, stylep2, stylep3]);


    return (
        <div className="cell" key={`${row}-${col}`} style={celltype} >
            <div className="player" style={player}>{pname}</div>
        </div>
    );
}

export default Cell;