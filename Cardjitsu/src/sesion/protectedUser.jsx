import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const UserCheck = () => { 
  const { token } = useContext(AuthContext)
  const [status, setStatus] = useState(null);

  useEffect(() => {
    console.log(token);
    axios({
      method: 'get',
      url: `${import.meta.env.VITE_BACKEND_URL}/protecteduser`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data.user)
        setStatus(response.data.message)
      })
      .catch(error => {
        setStatus(error.message);
      });
  }, []);


  return (
    <div>
      {status}
      <br ></br>
      <a href="/">Volver</a>
    </div>
  );
}

export default UserCheck;