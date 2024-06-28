import { useState } from 'react';
import axios from 'axios';
import './CompareCards.css'; // Import the CSS file for styling

function CompareCards() {
    const [card1, setCard1] = useState(null);
    const [card2, setCard2] = useState(null);
    const [card3, setCard3] = useState(null);
    const [bonus1, setBonus1] = useState(false);
    const [bonus2, setBonus2] = useState(false);
    const [bonus3, setBonus3] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backendResponse, setBackendResponse] = useState(null);

    const fetchCards = async () => {
        setLoading(true);
        setError(null);

        try {
            const userIDs = [1, 2, 3]; // IDs de usuarios para las cartas
            const responses = await Promise.all(
                userIDs.map((userID) =>
                    axios.get(`${import.meta.env.VITE_BACKEND_URL}/randomcardcompare`, {
                        params: { iduser: userID, cacheBuster: Math.random() }
                    })
                )
            );

            setCard1(responses[0].data);
            setCard2(responses[1].data);
            setCard3(responses[2].data);
        } catch (error) {
            setError(`Error fetching cards: ${error}`);
        }

        setLoading(false);
    };

    const toggleBonus = (cardNumber) => {
        switch (cardNumber) {
            case 1:
                setBonus1((prevBonus) => !prevBonus);
                break;
            case 2:
                setBonus2((prevBonus) => !prevBonus);
                break;
            case 3:
                setBonus3((prevBonus) => !prevBonus);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        try {
            const jsonData = [
                {
                    iduser: card1.iduser,
                    idmazo: card1.idmazo,
                    idcarta: card1.id,
                    idjugador: card1.idjugador,
                    bonus: bonus1 ? card1.tipo : 'No'
                },
                {
                    iduser: card2.iduser,
                    idmazo: card2.idmazo,
                    idcarta: card2.id,
                    idjugador: card2.idjugador,
                    bonus: bonus2 ? card2.tipo : 'No'
                },
                {
                    iduser: card3.iduser,
                    idmazo: card3.idmazo,
                    idcarta: card3.id,
                    idjugador: card3.idjugador,
                    bonus: bonus3 ? card3.tipo : 'No'
                }
            ];

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cartas/compara`, jsonData);
            console.log('Cartas comparadas enviadas exitosamente.');
            console.log('Respuesta del backend:', response.data);
            setBackendResponse(response.data);
        } catch (error) {
            setError(`Error al enviar las cartas comparadas: ${error}`);
        }
    };

    return (
        <>
            <div>
                <h1>Test Comparar Cartas</h1>
            </div>
            <div>
                <button onClick={fetchCards} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Cards'}
                </button>
            </div>
            <div className="cards-container">
                {card1 && (
                    <div className="card">
                        <h2>Card 1</h2>
                        <p>User ID: {card1.iduser}</p>
                        <p>Card ID: {card1.id}</p>
                        <p>Type: {card1.tipo}</p>
                        <p>Power: {card1.poder}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={bonus1}
                                onChange={() => toggleBonus(1)}
                            />
                            Add {card1.tipo} Bonus
                        </label>
                    </div>
                )}
                {card2 && (
                    <div className="card">
                        <h2>Card 2</h2>
                        <p>User ID: {card2.iduser}</p>
                        <p>Card ID: {card2.id}</p>
                        <p>Type: {card2.tipo}</p>
                        <p>Power: {card2.poder}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={bonus2}
                                onChange={() => toggleBonus(2)}
                            />
                            Add {card2.tipo} Bonus
                        </label>
                    </div>
                )}
                {card3 && (
                    <div className="card">
                        <h2>Card 3</h2>
                        <p>User ID: {card3.iduser}</p>
                        <p>Card ID: {card3.id}</p>
                        <p>Type: {card3.tipo}</p>
                        <p>Power: {card3.poder}</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={bonus3}
                                onChange={() => toggleBonus(3)}
                            />
                            Add {card3.tipo} Bonus
                        </label>
                    </div>
                )}
            </div>
            <div>
                <button onClick={handleSubmit}>Enviar</button>
            </div>
            {error && <p>{error}</p>}
            {backendResponse && (
                <div>
                    <h2>Respuesta del backend:</h2>
                    <ul>
                        {backendResponse.map((result) => (
                            <p>{`id usuario: ${result.iduser} -> puntaje_obtenido: ${result.puntaje_obtenido}`}</p>
                        ))}
                    </ul>
                </div>
            )}
            <a href="/">Volver a inicio</a>
        </>
    );
}

export default CompareCards;


