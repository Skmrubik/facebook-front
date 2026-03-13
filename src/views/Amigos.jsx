import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsuario, listSolicitudesAmistad } from '../api/usuario';
import { useNavigate } from 'react-router-dom';
import { aceptarSolicitud } from '../api/usuario';
import { getAmigos } from '../api/usuario';

const Amigos = () => {
  const [solicitudes, setSolicitudes] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [amigos, setAmigos] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    getAmigos(localStorage.getItem('id'))
        .then(item => {
            console.log("amigos ",item)
            const filas = [];
            for (let i = 0; i < item.length; i += 2) {
              let fila = []
              fila.push(item[i]);
              if (item[i+1]!=undefined){
                fila.push(item[i+1]);
              }
              
              filas.push(fila);
            }
            console.log("filas ",filas)
            setAmigos(filas)
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
        <h1 className='solicitudes-title'>Amigos</h1>
          {amigos && amigos.map((amigo)=> {
              return(
                <div className='amigos-fila'>
                {amigo.map((col) => {
                    return(
                      <div className="amigo-container" style={{display: 'flex', width: '50%', alignItems: 'center', cursor: 'pointer'}} 
                            onClick={() => irPerfilUsuario(col.idUsuario2.idUsuario)}>
                        <img className="img-amigo-amigos" src={`http://localhost:8080/imagenes/${col.idUsuario2.pathFotoPerfil}`}></img>
                        <div className="amigo-nombre">{col.idUsuario2.nombre}</div>
                      </div>
                    )
                })}
                </div>
              )
            })
          }
      </div>
      <div className='solicitudes-container-der'></div>
    </div>
  );
};

export default Amigos;