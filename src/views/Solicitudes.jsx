import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsuario, listSolicitudesAmistad } from '../api/usuario';
import { useNavigate } from 'react-router-dom';

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();


  useEffect(()=>{
    listSolicitudesAmistad(localStorage.getItem('id'))
    .then(item => {
        console.log("SOlicitudoes ", item)
        setSolicitudes(item);
    })
    .catch((err) => {
        console.log(err.message);
    });
  },[])

  
  function irPerfilUsuario(idUser){
    if (idUser!= localStorage.getItem('id')){
      navigate("/Perfil/"+idUser)
    } else {
      navigate("/Perfil")
    }
  }
  return (
    <div className='solicitudes-container'>
      <div className='solicitudes-container-izq'></div>
      <div className='solicitudes-container-cen'>
        <h1 className='solicitudes-title'>Solicitudes de amistad</h1>
          {solicitudes && solicitudes.map((solicitud)=> {
            return(
              <div className="solicitud-container" style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', color: 'white'}}>
                  <div className="nombre-solicitud" onClick={() => irPerfilUsuario(solicitud.idUsuario2.idUsuario)}>{solicitud.idUsuario2.nombre}</div>
                  <div>&nbsp;quiere ser tu amigo.</div>
                </div>
                <div>
                  <button className='button-aceptar-solicitud'>Aceptar solicitud</button>
                </div>
              </div>
            )
          })
          }
      </div>
      <div className='solicitudes-container-der'></div>
    </div>
  );
};

export default Solicitudes;