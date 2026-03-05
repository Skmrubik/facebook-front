import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsuario } from '../api/usuario';
import { listarPublicacionesUsuario } from '../api/publicacion';
import { GoTrash } from "react-icons/go";
import { borrarPublicacion } from '../api/publicacion';

const Perfil = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [contenido, setContenido] = useState(0);
  const [publicaciones, setPublicaciones] = useState(null);

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
    listarPublicacionesUsuario(localStorage.getItem('id'))
        .then(item => {
            console.log("publicaciones ",item)
            setPublicaciones(item)
        })
        .catch((err) => {
            console.log(err.message);
        });
  },[])

  function borrarPub(idPublicacion){
    borrarPublicacion(idPublicacion)
      .then(item => {
          console.log("publicacion ",item)
          listarPublicacionesUsuario(localStorage.getItem('id'))
          .then(item => {
              console.log("publicaciones ",item)
              setPublicaciones(item)
          })
          .catch((err) => {
              console.log(err.message);
          });
      })
      .catch((err) => {
          console.log(err.message);
      });
  }

  return (
    <div className='perfil-container'>
      <div className='perfil-container-izq'></div>
      <div className='perfil-container-cen'>
        {usuario && <div className='perfil-header'>
          <img src={imageUrl} style={{ width: '120px', height: '120px', marginRight: 15 }}></img>
          <div>
            <div className='perfil-header-nombre'>{usuario.nombre}</div>
            <div className='perfil-header-lugar'>{usuario.lugar}</div>
          </div>
        </div>}
        <div className='perfil-contenido'>
          {contenido == 0 && 
          <div className='perfil-contenido-publicaciones'>
            <div className='container-fotos-amigos'>
            </div>
            <div className='container-publicaciones-usuario'>
              {publicaciones &&
                publicaciones.map((publicacion,index)=> {
                  return(
                    <div className='publicacion'>
                      <div className='publicacion-header'>
                        <div className='publicacion-img-nombre'>
                          <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} style={{ width: '30px', height: '30px' }}></img>
                          <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
                        </div>
                        <div>
                          { localStorage.getItem('id') == publicacion.idUsuario1.idUsuario && 
                          <GoTrash size="25px" className='icono-eliminar-publicacion' onClick={()=> borrarPub(publicacion.idPublicacion)}/>}
                        </div>
                      </div>
                      <div className='publicacion-texto'>{publicacion.texto}</div>
                      {publicacion.idFoto && 
                      <img className='imagen-publicacion' src={`http://localhost:8080/imagenes/${publicacion.idFoto?.path}`}></img>}
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
                })
              }
            </div>
          </div>}
        </div>
      </div>
      <div className='perfil-container-der'></div>
    </div>
  );
};

export default Perfil;