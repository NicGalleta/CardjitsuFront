import React, { useState, useContext, createContext, useEffect } from 'react';
import './CardjitsuBoardStyle.css';
import Timer from './timer';

// Import all files in the 'cartas' folder as assets
import agua1 from '../assets/cartas/carta_01.png';
import agua2 from '../assets/cartas/carta_02.png';
import agua3 from '../assets/cartas/carta_03.png';
import agua4 from '../assets/cartas/carta_04.png';
import agua5 from '../assets/cartas/carta_05.png';
import agua6 from '../assets/cartas/carta_06.png';
import agua7 from '../assets/cartas/carta_07.png';
import agua8 from '../assets/cartas/carta_08.png';
import agua9 from '../assets/cartas/carta_09.png';
import dojo from '../assets/dojo.jpg';

export const CartasContext = createContext();

function CardjitsuBoard() {
  const [timer, setTimer] = useState(0);
  const tiempo_ronda = 10;
  const cartas = [
    {id: 1, tipo: "agua", poder: 1, cardname: "agua1", imagen: agua1},
    {id: 2, tipo: "agua", poder: 2, cardname: "agua2", imagen: agua2},
    {id: 3, tipo: "agua", poder: 3, cardname: "agua3", imagen: agua3},
    {id: 4, tipo: "agua", poder: 4, cardname: "agua4", imagen: agua4},
    {id: 5, tipo: "agua", poder: 5, cardname: "agua5", imagen: agua5},
    {id: 6, tipo: "agua", poder: 6, cardname: "agua6", imagen: agua6},
    {id: 7, tipo: "agua", poder: 7, cardname: "agua7", imagen: agua7},
    {id: 8, tipo: "agua", poder: 8, cardname: "agua8", imagen: agua8},
    {id: 9, tipo: "agua", poder: 9, cardname: "agua9", imagen: agua9},
  ];

  // crear mano random
  const [mano, setMano] = useState([]);

  const seleccionarCartas = () => {
    const cartasRandom = [];
    while (cartasRandom.length < 5) {
      const randomIndex = Math.floor(Math.random() * cartas.length);
      const carta = cartas[randomIndex];
      if (!cartasRandom.includes(carta.id)) {
        cartasRandom.push(carta.id);
      }
    }
    const cartasEnMano = cartas.filter((carta) => cartasRandom.includes(carta.id));
    setMano(cartasEnMano);
  };

  // selecciono carta para el ataque 
  useEffect(() => {
    seleccionarCartas();
  }
  , []);
  const [cartaselected, setCartaselected] = useState(null);
  
  const seleccionarCarta = (id) => {
    console.log('Carta seleccionada:', id);
    setCartaselected(id);
  }

  useEffect(() => {
    if (timer === tiempo_ronda ){

      if (cartaselected === null) {
        console.log('No se seleccionó ninguna carta, seleccionar random:');
        const randomCarta = mano[Math.floor(Math.random() * mano.length)];
        console.log('Carta random:', randomCarta);
        setCartaselected(randomCarta.id);
      }
      else {
        console.log('Seleccion final:', cartaselected, ",", cartas[cartaselected-1].cardname);
    }
    }},
    [timer]);
  

  return (
    <div className="contenerdor-primario">
      <div className="grid-container-princial">
        <div className="dojo" style={{ backgroundImage: `url(${dojo})` }}>
          
          <div className="timer">
          <CartasContext.Provider value={{timer, setTimer, tiempo_ronda}}>
            <Timer/>
          </CartasContext.Provider>
          </div>
          
          <div className='grid-contenedor-jugadores'>
            <div>
              <p>Jugador 1</p>
            </div>
            <div>
            {cartaselected !== null && <img src={cartas[cartaselected-1].imagen} alt={cartas[cartaselected-1].cardname} />}
              

            </div>
            <div>
              <p>Jugador 3</p>
            </div>
          </div>

        </div>
        
        
        <div className="grid-container-cartas">
          {mano.map((carta) => (
            <div key={carta.id}>
              <img src={carta.imagen} alt={carta.cardname} />
              <br></br>
              <button onClick={() => seleccionarCarta(carta.id)}>Seleccionar</button>
              {cartaselected === carta.id && <p>Carta seleccionada</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default CardjitsuBoard;