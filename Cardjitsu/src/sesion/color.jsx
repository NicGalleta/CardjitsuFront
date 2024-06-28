import React, { useState, useEffect, useContext } from 'react';
import { ColorContext } from './signup';
import "./color.css";

function Color({hex}) {
    const { color, setColor } = useContext(ColorContext);
    
    return (
        <div className={`color-box ${color === hex ? 'selected' : ''}`} 
             style={{ backgroundColor: hex }} 
             onClick={() => setColor(hex)}>
        </div>
    )

}

export default Color;