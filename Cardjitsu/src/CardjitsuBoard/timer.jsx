import React, { useContext, useEffect, useState } from 'react';
import './CardjitsuBoardStyle.css';
import { CartasContext } from './CjBoard';

const Timer = () => {
    const {timer, setTimer, tiempo_ronda} = useContext(CartasContext);
    let interval = null;

    useEffect(() => {
        interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer >= tiempo_ronda) {
                    clearInterval(interval);
                    return 0;
                } else {
                    return prevTimer + 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='reloj' style={{ background: 
        `conic-gradient(red 0% ${100*timer/tiempo_ronda}%, green ${100*timer/tiempo_ronda}% 100%)` }}>
            <p className='texto-reloj'> {timer}s </p>
            {timer === 30 && <p>¡Señal!</p>}
        </div>
    );
};

export default Timer;