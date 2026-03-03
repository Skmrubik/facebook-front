import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listarPublicaciones } from '../api/publicacion';
import { getUsuario } from '../api/usuario';

function Inicio(){
  const [publicaciones, setPublicaciones] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(()=>{
    getUsuario(localStorage.getItem('id'))
    .then(item => {
        console.log("Usuario ", item)
        setImageUrl(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
        setUsuario(item);
    })
    .catch((err) => {
        console.log(err.message);
    });
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
        {usuario !=null && <div className='crear-publicacion'>
          <div className='crear-publicacion-header'>
            <img src={imageUrl} style={{ width: '30px', height: '30px' }}></img>
            <div className='publicacion-nombre-uno'>{usuario.nombre}</div>
          </div>
          <textarea className='crear-publicacion-texto'></textarea>
        </div>}
        {publicaciones && publicaciones.map((publicacion,index)=> {
          return(
            <div className='publicacion'>
              <div className='publicacion-header'>
                <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} style={{ width: '30px', height: '30px' }}></img>
                <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
              </div>
              <div className='publicacion-texto'>{publicacion.texto}</div>
              <div className='publicacion-interaccion'>
                <div>
                  Me gusta
                </div>
                <div>
                  Comentar
                </div>
              </div>
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