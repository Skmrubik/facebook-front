
import { useEffect, useState } from 'react';
import { GoTrash } from "react-icons/go";

function Publicacion({publicacion, irPerfilUsuario, borrarPub}) {


    return (
        <div className='publicacion'>
          <div className='publicacion-header'>
            <div className='publicacion-img-nombre' onClick={() => irPerfilUsuario(publicacion.idUsuario1.idUsuario)}>
              <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} 
                  style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
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
                  
    );
};

export default Publicacion;