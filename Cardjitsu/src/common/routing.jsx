import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instructions from '../game/Instructions';
import App from './App';
import AboutUs from '../AboutUs/AboutUs';
import Login from '../sesion/login';
import RandomCard from '../game/RandomCard';
import UserCheck from '../sesion/protectedUser';
import Signup from '../sesion/signup';
import Board from '../game/Board';
import NewGame from '../game/NewGame'
import Navbar from './navegacion/Navbar';
import CompareCards from '../game/CompareCards';
import Perfil from '../sesion/Perfil';
import CardjitsuBoard from '../CardjitsuBoard/CjBoard';
import Resultado from '../game/Resultado';
import SalaEspera from '../game/SalaEspera';

function Routing(){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/randomcard" element={<RandomCard/>} />
            <Route path="/protecteduser" element={<UserCheck/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/board" element={<Board />} />
            <Route path="/cartas/compara" element={<CompareCards />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/newgame" element={<NewGame/>}/>
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/cardjitsuboard" element={<CardjitsuBoard />} />
            <Route path="/partidas/resultado" element={<Resultado />} />
            <Route path="/salaespera/:partida_id" element={<SalaEspera />} />
        </Routes>
        </BrowserRouter>
        
        </>

    )

}
export default Routing;