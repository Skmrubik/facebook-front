import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { GoTrash } from "react-icons/go";
import { meGustaPublicacion } from "../api/publicacion";
import { AiFillLike } from "react-icons/ai";
import { listarMeGustasPublicacion } from "../api/publicacion";
import { getMegusta } from "../api/publicacion";
import { borrarMegusta } from "../api/publicacion";
import { useNavigate } from 'react-router-dom';

function Publicacion({publicacion, irPerfilUsuario, borrarPub, key}) {

    const [meGustas,setMeGustas] = useState(null);
    const [meGustaPropio, setMeGustaPropio] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        listarMeGustasPublicacion(publicacion.idPublicacion)
        .then(item => {
            setMeGustas(item);
            console.log(publicacion.idPublicacion," get Me gusta ",item)
            item.map((publicacion)=>{
                if(publicacion.idUsuario.idUsuario == localStorage.getItem('id')){
                    setMeGustaPropio(true);
                }
            });
        })
        .catch((err) => {
            console.log(err.message);
        }); 
    },[])

    function meGusta(){
        if (!meGustaPropio) {
            meGustaPublicacion(localStorage.getItem('id'), publicacion.idPublicacion)
            .then(item => {
                setMeGustaPropio(true);
                listarMeGustasPublicacion(publicacion.idPublicacion)
                .then(item => {
                    setMeGustas(item);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
        } else {
            getMegusta(localStorage.getItem('id'), publicacion.idPublicacion)
            .then(item => {
                setMeGustaPropio(false);
                borrarMegusta(item)
                .then(item => {
                    listarMeGustasPublicacion(publicacion.idPublicacion)
                    .then(item => {
                        setMeGustas(item);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                });
                
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }

    function irAPublicacion(idPub){
        navigate("/Publicacion/"+idPub)
    }
    return (
        <div className='publicacion' key={key}>
          <div className='publicacion-header'>
            <div className='publicacion-img-nombre'>
                <div style={{display: 'flex'}} onClick={() => irPerfilUsuario(publicacion.idUsuario1.idUsuario)}>
                    <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} 
                        style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                    <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
                </div>
              <div className="publicacion-fecha" onClick={() => irAPublicacion(publicacion.idPublicacion)}>
                {publicacion.fecha?.substring(0,10)+' '+publicacion.fecha?.substring(11,16)}</div>
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
            <div style={{display: 'flex'}}>
            {meGustas.length==1 && <div>{meGustas[0].idUsuario.nombre}</div>}
            {meGustas.length>1 && <div>{meGustas[0].idUsuario.nombre} y {meGustas.length-1} más</div>}
            </div>
          </div>}
          <div className='publicacion-interaccion'>
            {!meGustaPropio && 
            <div className="container-megusta" onClick={meGusta}>
                <AiOutlineLike size="25px" className="icono-megusta"/>
                <p style={{margin: 0, marginLeft: 5}}>Me gusta</p>
            </div>}
            {meGustaPropio && 
            <div className="container-megusta-activo" onClick={meGusta}>
                <AiOutlineLike size="25px" className="icono-megusta"/>
                <p style={{margin: 0, marginLeft: 5}}>Me gusta</p>
            </div>}
            <div>
              Comentar
            </div>
          </div>
        </div>
                  
    );
};

export default Publicacion;