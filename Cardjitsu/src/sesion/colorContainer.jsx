import React, { useState,useEffect, useContext } from 'react';
import { ColorContext } from './signup';
import Color from './color';
import "./color.css";

function ColorContainer() {
    const { color, setColor } = useContext(ColorContext);
    const colors = ['#FF0000', '#3434FF', '#008000', '#FFA500', '#800080', '#FFFF00', '#22FFFF','#000000', "#ff6289"];
    
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center', // Centers items horizontally
        alignItems: 'center', // Centers items vertically
        flexWrap: 'wrap',
    };
        
    return (
        <>
        <br></br>
        <h2>Choose a color</h2>
        <div style={containerStyle}>
            {colors.map((hex, index) => (
                <Color key={index} hex={hex} />
            ))}
        </div>
        </>

    )
}

export default ColorContainer;