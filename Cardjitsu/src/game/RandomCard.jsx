import { useState } from 'react'
import axios from 'axios'


function RandomCard() {
    const [card, setCard] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchCard = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/randomcard`);
            setCard(response.data)
        } catch (error) {
            setError(`Error fetching card ${error}`)
        }
        setLoading(false)
    }

    return (
        <>
            <div>
                <h1>Random Card</h1>
            </div>
            <div>
                <button onClick={fetchCard} disabled={loading}>
                    {loading ? 'Loading...' : 'Get Card'}
                </button>
            </div>
            {card && (
                <div>
                    <p>{card.cardname}</p>
                    <p>{card.tipo}</p>
                    <p>{card.poder}</p>
                </div>
            )}
            {error && <p>{error}</p>}
            <a href= "/">Volver a inicio</a>
        </>
    )
}

export default RandomCard