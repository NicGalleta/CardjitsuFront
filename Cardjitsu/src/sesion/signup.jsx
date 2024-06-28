import React, { useState, createContext } from 'react';
import axios from 'axios';
import ColorContainer from './colorContainer';
import './color.css';
import penguinImage from '../assets/penguin.png';

export const ColorContext = createContext();

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [color, setColor] = useState("#FF0000");
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                name: username,
                email: email,
                password: password,
                color: color
            });
            setMsg(response.data.message);
            setError(false);
            return true;
        } catch (error) {
            console.error('An error occurred while trying to signup:', error);
            setError(true);
            return false;
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                email: email,
                password: password
            });
            localStorage.setItem('user_id', response.data.id);
            localStorage.setItem('token', response.data.access_token);
            window.location.href = '/'; // Redirect to the main page after successful login
        } catch (error) {
            console.error('An error occurred while trying to login:', error);
            setError(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMsg("");
        const signupSuccess = await handleSignup();
        if (signupSuccess) {
            await handleLogin();
        }
    };

    return (
        <div className="Signup">
            <h1>Sign up</h1>
            {msg.length > 0 && <div className="successMsg"> {msg} </div>}
            {error && <div className="error">Hubo un error con el signup, por favor trata nuevamente.</div>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                </label>
                <br />
                <input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <br />
                <label>
                    Email:
                </label>
                <br />
                <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <br />
                <label>
                    Password:
                </label>
                <br />
                <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <ColorContext.Provider value={{ color, setColor }}>
                    <ColorContainer />
                </ColorContext.Provider>
                <img src={penguinImage} alt="" style={{ width: '10%', height: '10%', backgroundColor: color }} />
                <br />
                <input type="submit" value="Crear cuenta!" style={{ width: '20%' }} />
            </form>
            <a href="/">Volver</a>
        </div>
    );
}

export default Signup;