import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { GoTrash } from "react-icons/go";
import { meGustaPublicacion } from "../api/publicacion";
import { AiFillLike } from "react-icons/ai";
import { listarMeGustasPublicacion } from "../api/publicacion";

function Publicacion({publicacion, irPerfilUsuario, borrarPub, actualizarPub}) {

    const [meGustas,setMeGustas] = useState(null);

    useEffect(()=> {
        listarMeGustasPublicacion(publicacion.idPublicacion)
        .then(item => {
            setMeGustas(item);
            console.log("get Me gusta ",item)
        })
        .catch((err) => {
            console.log(err.message);
        }); 
    },[])

    function meGusta(){
        meGustaPublicacion(localStorage.getItem('id'), publicacion.idPublicacion)
        .then(item => {
            console.log("Me gusta ",item)
            listarMeGustasPublicacion(publicacion.idPublicacion)
            .then(item => {
                setMeGustas(item);
                console.log("get Me gusta ",item)
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
          {meGustas?.length>0 && <div className="me-gustas-acumulados">
            <AiFillLike size="20px"/>
            {meGustas.map((meGusta, index) => {
                return(<div>{meGusta.idUsuario.nombre}</div>)
            })}
          </div>}
          <div className='publicacion-interaccion'>
            <div className="container-megusta" onClick={meGusta}>
                <AiOutlineLike size="25px" className="icono-megusta"/>
                <p style={{margin: 0, marginLeft: 5}}>Me gusta</p>
            </div>
            <div>
              Comentar
            </div>
          </div>
        </div>
                  
    );
};

export default Publicacion;