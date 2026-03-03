import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listarPublicaciones } from '../api/publicacion';

const Inicio = () => {
  const [publicaciones, setPublicaciones] = useState(null)

  useEffect(()=>{
    listarPublicaciones()
    .then(item => {
        console.log("publicaciones ",item)
        setPublicaciones(item)
    })
    .catch((err) => {
        console.log(err.message);
    });
  },[])

  return (
    <div className='inicio-container'>
      <div className='inicio-container-izq'>

      </div>
      <div className='inicio-container-cen'>
        <div><h1>Inicio</h1></div>
        {publicaciones && publicaciones.map((publicacion,index)=> {
          return(
            <div className='publicacion'>
              <div className='publicacion-header'>
                <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} style={{ width: '30px', height: '30px' }}></img>
                <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
              </div>
              <div className='publicacion-texto'>{publicacion.texto}</div>
            </div>
          )
        })}
      </div>
      <div className='inicio-container-der'>
        
      </div>
    </div>
  );
};

export default Inicio;