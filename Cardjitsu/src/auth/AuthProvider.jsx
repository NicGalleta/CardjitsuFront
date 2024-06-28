import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [myid, setMyid] = useState(localStorage.getItem('user_id') || null);

    function logout() {
        setToken(null)
        localStorage.removeItem('token') 
        localStorage.removeItem('user_id')
        localStorage.removeItem('jugador_id') 
        localStorage.removeItem('partida_id')
        setMyid(null)
    }


    return (
        <AuthContext.Provider value={{ token, setToken, logout, myid, setMyid}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;