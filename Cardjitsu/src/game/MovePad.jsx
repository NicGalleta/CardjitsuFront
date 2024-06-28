import './Board.css';
import React, { useState, useEffect, createContext } from 'react';
import Arrow from './Arrow';
import { BoardContext } from './Board';

export const PadContext = createContext();

function MovePad(){
    const [ msg_dir, setMsg_dir ] = useState("");
    return (
        <PadContext.Provider value={{ setMsg_dir }}>
        <div className='MovePad'>
            <Arrow direction={"arriba"}></Arrow>
            <Arrow direction={"izquierda"}></Arrow>
            <Arrow direction={"derecha"}></Arrow>
            <Arrow direction={"abajo"}></Arrow>  

        </div>
        
        </PadContext.Provider>
    );
}

export default MovePad;