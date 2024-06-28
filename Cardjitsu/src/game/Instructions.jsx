import './Instructions.css';
import Footer from '../common/navegacion/Footer';
import Navbar from '../common/navegacion/Navbar';

function Instructions() {
  return (
    <div className="container">
      <Navbar/>
      <div className="title-section">
        <h1>Instrucciones del juego</h1> {/* Cambiado el título aquí */}
        <a href="/">Volver a inicio</a>
      </div>
      <div className="instruction-container">
        <div className="instruction-column">
          <div>
            <h2>Reglas principales</h2>
            <p>
              El juego es entre 3 jugadores, y se desarrolla por turnos. Estos
              turnos se definen de manera aleatoria al inicio de la partida.
            </p>
            <p>
              En cada turno, los jugadores se mueven en una dirección en el tablero
              (adelante, izquierda, derecha, abajo).
            </p>
            <p>
              Existen 3 tipos de casillas, todas están posicionadas de forma
              aleatoria en el tablero:
            </p>
            <p>
              La partida termina solo cuando un jugador llega a la última fila, y
              se le sumarán 1000 puntos por llegar a esta.
            </p>
            <p>
              El ganador de la partida será aquel jugador que tenga más puntaje
              acumulado, sin importar si fue el que llegó a la meta.
            </p>
          </div>
          <h2>Reglas Cardjitsu</h2>
          <div>
            <p>
              Una vez comienza la partida tienes 30 segundos para seleccionar una
              carta de tu mano. De no seleccionar una en el tiempo que corresponde
              se seleccionará una carta aleatoria por ti.
            </p>
            <p>
              Las cartas se comparan entre sí, y se definen los ganadores y
              perdedores de la siguiente manera:  
            </p>
            <ul>  
              <li>
                En caso de que exista un primer, segundo y tercer lugar, se ganan
                50, 25 y 0 puntos respectivamente.
              </li>
              <li>
                Si dos cartas le ganan a una tercera, y entre ellas empatan, estas
                últimas ganan 25 puntos y la perdedora 0.
              </li>
              <li>
                Si dos cartas empatan, y pierden ante una tercera, esta última gana
                50 puntos y las otras 0.
              </li>
            </ul>
            <p>
              la partida termina cuando un jugador alcanza los 250 puntos.
            </p>
          </div> 
        </div>
        <div className="instruction-column">
          <h2>Tipo de Casillas</h2>
          <ul>
            <li>
              <strong>Casillas Normal:</strong> No afecta al jugador, solo lo posiciona en
              el tablero.
            </li>
            <li>
              <strong>Casillas sorpresa:</strong> Existen 3 tipos de casillas sorpresa
            </li>
            <ul>
              <li>
                <strong>Cardjitsu:</strong> Permite a los participantes jugar una
                partida de Cardjitsu, y de esta manera acumular puntos. Cada partida
                de Cardjitsu termina cuando un jugador alcanza los 250 puntos.
              </li>
              <li>
                <strong>Castigo:</strong> Al jugador que caiga en la casilla, le
                puede restar puntaje o bien retroceder su posición en el tablero. En
                el caso del retroceso, si un pingüino se encuentra previamente en la
                casilla, se posiciona al afectado en la siguiente disponible.
              </li>
              <li>
                <strong>Beneficio Cardjitsu:</strong> Otorga a los jugadores un
                beneficio para las partidas de Cardjitsu, donde pueden sumarle 10
                puntos a su carta de fuego, nieve o agua según corresponda (el máximo
                de nivel por carta es 12, por lo que si la suma excede ese valor se
                mantiene en 12).
              </li>
            </ul>
            
          </ul>
        </div>
      </div>
      <br></br>
      <Footer/>
    </div>
  );
}

export default Instructions;