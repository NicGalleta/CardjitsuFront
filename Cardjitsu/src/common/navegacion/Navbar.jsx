import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './Navbar.css';
import Logo from '../../assets/Logo.png';
import perfilImage from '../../assets/perfil.png';
import { AuthContext } from "../../auth/AuthContext";

function Navbar() {
    const { token, logout } = useContext(AuthContext);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [testDropdownOpen, setTestDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state
    const userId = localStorage.getItem('user_id');

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const toggleTestDropdown = () => setTestDropdownOpen(!testDropdownOpen);

    const handleLogout = () => {
        logout();
    };

    const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/perfil`, {
                headers: {
                    'user_id': userId
                }
            });
            setUserData(response.data);
        } catch (error) {
            setError(`Error fetching user: ${error.message}`);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token && userId) {
            fetchUser();
        }
    }, [token, userId]); // Fetch user data when token or userId changes

    return (
        <div className="navbar">
            <a href="/">
                <img src={Logo} alt="Logo" className="navbar-logo" />
            </a>

            <div className="navbar-links">
                <a href="/instructions">Instrucciones</a>
                <a href="/aboutus">About us</a>
                <div className="dropdown test-dropdown">
                    <button className="dropbtn" onClick={toggleTestDropdown}>
                        Test Links
                    </button>
                    <div className={`dropdown-content ${testDropdownOpen ? 'show' : ''}`}>
                        <a href="/randomcard">Test Card</a>
                        <a href="/protecteduser">Test Token User</a>
                        <a href="/cartas/compara">Comparar Cartas</a>
                        <a href="/cardjitsuboard">Tablero Cardjitsu</a>
                        <a href="/partidas/resultado">Podio</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn" onClick={toggleDropdown}>
                        <img 
                            src={perfilImage} 
                            alt="Perfil" 
                            className="perfil-image" 
                            style={{ backgroundColor: userData?.color || 'transparent' }}
                        />
                    </button>
                    <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                        {token ? (
                            <>
                                <a href="/perfil">Perfil</a>
                                <a href="/" onClick={handleLogout}>Cerrar sesión</a>
                            </>
                        ) : (
                            <>
                                <a href="/login">Login</a>
                                <a href="/signup">Crear cuenta</a>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <p>{token ? 'Logged' : 'Not Logged'}</p>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Navbar;