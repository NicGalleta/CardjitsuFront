import './Board.css';
import React, { useState, useEffect, useContext } from 'react';
import { PadContext } from './MovePad';
import { BoardContext } from './Board';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

function Arrow({direction}){
    const [arrowStyle, setArrowStyle] = useState({});
    const { log1, setLog1, log2, log3, setVersion } = useContext(BoardContext);
    const { token } = useContext(AuthContext);
    const updateArrowStyle = (direction) => {
        if (direction === "arriba") {
            setArrowStyle({  
                top: "0%", 
                left: "50%",
                transform: 'translateX(-50%) rotate(180deg)' 

            });
        } else if (direction === "abajo") {
            setArrowStyle({  
                bottom: "5%", 
                left: "50%",
                transform: 'translateX(-50%) rotate(0deg)' 
            });
        } else if (direction === "izquierda") {
            setArrowStyle({ 
                left: "0%", 
                top: "50%",
                transform: 'translateY(-50%) rotate(90deg)' 
            });
        } else if (direction === "derecha") {
            setArrowStyle({ 
                right: "0%", 
                top: "50%",
                transform: 'translateY(-50%) rotate(270deg)' 
            });
        } else {
            setArrowStyle({  });
        }};

    useEffect(() => {updateArrowStyle(direction)}, []);

    const handleclickarrow = () => {
        console.log("Arrow clicked", direction);
        const jug_id = localStorage.getItem('jugador_id');
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_BACKEND_URL}/movimientos/jugada`,
            headers: {
              'Authorization': `Bearer ${token}`
            },
              data: {
                  id_jugador: jug_id,
                  movimiento: direction
              }
          })
            .then(response => {
                if (response.data.message.includes("Movimiento inválido")){
                    log3.current = log2.current;
                    log2.current = log1;
                    setLog1(response.data.message);
                    setVersion(prevVersion => prevVersion + 1);
                    return;
                }
                if (response.data.tipo_consecuencia){
                    log3.current = log2.current;
                    log2.current = log1;
                    setLog1(response.data.tipo_consecuencia+"!");
                    setVersion(prevVersion => prevVersion + 1);
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }
    return (
        <div className="arrow" style={arrowStyle} onClick={handleclickarrow}></div>
    );
}  

export default Arrow;