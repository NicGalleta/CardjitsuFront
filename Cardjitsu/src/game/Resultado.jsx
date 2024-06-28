import React, { useState } from 'react';
import axios from 'axios'; // Agregamos esta línea para importar axios
import './Resultados.css';
import podio from '../assets/podio.png';
import completo from '../assets/completo.png';

function Resultado() {
    const [formData, setFormData] = useState([
        { iduser: '', idjugador: '', puntaje: '' },
        { iduser: '', idjugador: '', puntaje: '' },
        { iduser: '', idjugador: '', puntaje: '' }
    ]);
    const [submittedData, setSubmittedData] = useState(null);
    const [error, setError] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false); // Estado para controlar si el formulario ha sido enviado

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const newState = [...prevState];
            newState[index][name] = value;
            return newState;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partidas/resultado`, formData);
            console.log('Datos enviados exitosamente al backend:', formData);
            console.log('Respuesta del backend:', response.data);
            setSubmittedData(response.data); // Solo guardamos los datos en el estado sin convertir a JSON
            setError(null);
            setFormSubmitted(true); // Marcamos el formulario como enviado
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            setError(`Error al enviar los datos: ${error.message}`);
        }
    };

    // Renderizar el formulario si el formulario no ha sido enviado
    if (!formSubmitted) {
        return (
            <div className="container">
                <h1>Test Podio</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        {formData.map((user, index) => (
                            <div key={index}>
                                <h2>Usuario {index + 1}</h2>
                                <div>
                                    <label htmlFor={`iduser${index}`}>ID de Usuario:</label>
                                    <input type="number" id={`iduser${index}`} name="iduser" value={user.iduser} onChange={(e) => handleChange(e, index)} required />
                                </div>
                                <div>
                                    <label htmlFor={`idjugador${index}`}>ID de Jugador:</label>
                                    <input type="number" id={`idjugador${index}`} name="idjugador" value={user.idjugador} onChange={(e) => handleChange(e, index)} required />
                                </div>
                                <div>
                                    <label htmlFor={`puntaje${index}`}>Puntaje:</label>
                                    <input type="number" id={`puntaje${index}`} name="puntaje" value={user.puntaje} onChange={(e) => handleChange(e, index)} required />
                                </div>
                            </div>
                        ))}
                        <button type="submit">Enviar</button>
                    </form>
                </div>
                {error && <p>{error}</p>}
                <a href="/">Volver</a>
            </div>
        );
    }

    // Convertir el submittedData a un array con solo id y lugar
    const formattedData = submittedData.map((element, index) => ({
        id: element.iduser,
        lugar: element.lugar
    }));

    // Renderizar el JSON enviado si el formulario ha sido enviado
    return (
        <div className="container">
            <h1>Test Podio</h1>
            <div>
                <h2>Respuesta del Backend:</h2>
                <div className='podio'>
                    <div className='segundo-lugar'>
                        {formattedData.map((user, index) => (
                            <div key={index}>
                                {index % 3 === 1 && (
                                    <>
                                        <p>ID de Usuario: {user.id}</p>
                                        <p>Lugar: {user.lugar}</p>
                                        <img src={completo} alt="segundo" style={{ width: '150%' }} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='primer-lugar'>
                        {formattedData.map((user, index) => (
                            <div key={index}>
                                {index % 3 === 0 && (
                                    <>
                                        <p>ID de Usuario: {user.id}</p>
                                        <p>Lugar: {user.lugar}</p>
                                        <img src={completo} alt="primero" style={{ width: '150%' }} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='tercer-lugar'>
                        {formattedData.map((user, index) => (
                            <div key={index}>
                                {index % 3 === 2 && (
                                    <>
                                        <p>ID de Usuario: {user.id}</p>
                                        <p>Lugar: {user.lugar}</p>
                                        <img src={completo} alt="tercero" style={{ width: '150%' }} />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <img src={podio} alt="podio" style={{ width: '50%' }} /> {/* Set the width to 50% */}
                </div>
            </div>
            <a href="/" style={{ color: 'black' }}>Volver a inicio</a>
        </div>
    );
}

export default Resultado;
