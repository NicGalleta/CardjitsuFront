import React from 'react';
import './sobrenosotros.css';
import completoImage from '../assets/completo.png';
import senseiImage from '../assets/sensei.png';
import fuego from '../assets/fuego.png';
import nieve from '../assets/nieve.png';
import agua from '../assets/agua.png';

import Navbar from '../common/navegacion/Navbar';
import Footer from '../common/navegacion/Footer';

function AboutUs() {
  return (
    <div className="about-us-container">
      <Navbar />
      <div className="content">
        <br />
        <h1>About Us</h1>
        <a href="/">Volver a inicio</a>
        <div className="grid-container">
          <img src={completoImage} alt="Completo" className="image" />
          <p>Esta es la página sobre un grupo que tiene su corazón dividido en 
            dos grandes amores que no pueden controlar. Por un lado, el amor por los completos
            en cada una de sus versiones, ya sea que le pongas con palta, ketchup, tomate, mayo, chucrut o cualquiera
            de los ingredientes que se te ocurran, siempre serán un manjar para nosotros. Por otro lado, los 
            reune el amor por el recuerdo de aquellos juegos que formaron parte de nuestra infancia, 
            como lo es el caso de su último proyecto, el juego de cartas Cardjitsu.
          </p>
          <img src={senseiImage} alt="Sensei" className="image small-image" />
        </div>
        <div className="grid-container">
          <div>
              <img src={fuego} alt="fuego"/>
            <h1>Renata</h1>
            <p>Estudiante de Ingeniería Civil en Computación en la Universidad de Chile.</p>
          </div>
          <div>
              <img src={agua} alt="agua" />
            <h1>Nicolás</h1>
            <p>Estudiante de Ingeniería Civil en Computación en la Universidad de Chile.</p>
          </div>
          <div>
              <img src={nieve} alt="nieve" />
            <h1>Javiera</h1>
            <p>Estudiante de Ingeniería Civil en Computación en la Universidad de Chile.</p>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}

export default AboutUs;
