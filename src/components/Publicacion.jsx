import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState, useRef } from 'react';
import { GoTrash } from "react-icons/go";
import { meGustaPublicacion } from "../api/publicacion";
import { AiFillLike } from "react-icons/ai";
import { listarMeGustasPublicacion } from "../api/publicacion";
import { getMegusta } from "../api/publicacion";
import { borrarMegusta } from "../api/publicacion";
import { useNavigate } from 'react-router-dom';
import { enviarNotificacion } from "../api/publicacion";
import { getUsuario } from "../api/usuario";
import { AiFillCaretRight } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";
import { useOutsideClick } from '../hook/useOutsideClick'
import { comentarPublicacion, listComentariosPublicacion } from "../api/publicacion";

function Publicacion({publicacion, irPerfilUsuario, borrarPub, key}) {

    const [meGustas,setMeGustas] = useState(null);
    const [meGustaPropio, setMeGustaPropio] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [divComentarModal,setDivComentarModal] = useState(false);
    const [textoPublicacion, setTextoPublicacion] = useState("");
    const [comentarios, setComentarios]= useState(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useOutsideClick(containerRef, () => setDivComentarModal(false));

    useEffect(()=> {
        getUsuario(localStorage.getItem('id'))
        .then(item => {
            setUsuario(item);
        })
        .catch((err) => {
            console.log(err.message);
        });
        listarMeGustasPublicacion(publicacion.idPublicacion)
        .then(item => {
            setMeGustas(item);
            item.map((publicacion)=>{
                if(publicacion.idUsuario.idUsuario == localStorage.getItem('id')){
                    setMeGustaPropio(true);
                }
            });
        })
        .catch((err) => {
            console.log(err.message);
        }); 
        listComentariosPublicacion(publicacion.idPublicacion)
        .then(item => {
            setComentarios(item);
        })
        .catch((err) => {
            console.log(err.message);
        });
        console.log("Publicacion usuario", publicacion.idUsuario2)
    },[])

    function meGusta(){
        if (!meGustaPropio) {
            meGustaPublicacion(localStorage.getItem('id'), publicacion.idPublicacion)
            .then(item => {
                const notificacion = {
                    idUsuario: publicacion.idUsuario1.idUsuario,
                    texto: 'Tu publicación ha recibido un me gusta de '+ usuario.nombre,
                    tipo: 0,
                    url: '/Publicacion/'+publicacion.idPublicacion,
                    leido: false,
                }
                enviarNotificacion(notificacion)
                .then(item => {
                    console.log("Notificacion ", item);
                })
                .catch((err) => {
                    console.log(err.message);
                });
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

    function publicarComentario(){
        const comentario = {
            idPublicacion: publicacion.idPublicacion,
	        idUsuario: localStorage.getItem('id'),
	        descripcion: textoPublicacion,
	        fecha: new Date().toISOString()
        }
        comentarPublicacion(comentario)
        .then(item => {
            console.log("Comentario ", item);
            listComentariosPublicacion(publicacion.idPublicacion)
            .then(item => {
                setComentarios(item);
                setTextoPublicacion("");
            })
            .catch((err) => {
                console.log(err.message);
            });
            setDivComentarModal(false);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const inputAreaTexto = (e) => {
        setTextoPublicacion(e.target.value)
    }

    return (
        <div className='publicacion' key={key}>
          <div className='publicacion-header'>
            {publicacion.idUsuario2!= null ?(
                <div className='publicacion-header-dos'>
                    <div className='publicacion-img-nombre'>
                    <div style={{display: 'flex'}} onClick={() => irPerfilUsuario(publicacion.idUsuario2.idUsuario)}>
                        <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario2.pathFotoPerfil}`} 
                            style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                        <div className='publicacion-nombre-uno'>{publicacion.idUsuario2.nombre}</div>
                    </div>
                    <div className="publicacion-fecha" onClick={() => irAPublicacion(publicacion.idPublicacion)}>
                        {publicacion.fecha?.substring(0,10)}</div>
                    </div>
                    <AiFillCaretRight size="15px" className="icono-flecha-publicacion"/>
                    <div className='publicacion-img-nombre'>
                    <div style={{display: 'flex'}} onClick={() => irPerfilUsuario(publicacion.idUsuario1.idUsuario)}>
                        <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} 
                            style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                        <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
                    </div>
                    <div className="publicacion-fecha" onClick={() => irAPublicacion(publicacion.idPublicacion)}>
                        {publicacion.fecha?.substring(0,10)}</div>
                    </div>
                </div>)
            :
                (<div className='publicacion-header'>
                    <div className='publicacion-img-nombre'>
                    <div style={{display: 'flex'}} onClick={() => irPerfilUsuario(publicacion.idUsuario1.idUsuario)}>
                        <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`} 
                            style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                        <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
                    </div>
                    <div className="publicacion-fecha" onClick={() => irAPublicacion(publicacion.idPublicacion)}>
                        {publicacion.fecha?.substring(0,10)}</div>
                    </div>
                </div>)
            }
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
            <div style={{cursor: "pointer"}} onClick={() => setDivComentarModal(true)}>
              Comentar
            </div>
            
          </div>
          <div>
                {comentarios && 
                    comentarios.map((comentario) => {
                        return(
                            <div className="comentario">
                                <div style={{display: 'flex'}} onClick={() => irPerfilUsuario(comentario.idUsuario.idUsuario)}>
                                    <img src={`http://localhost:8080/imagenes/${comentario.idUsuario.pathFotoPerfil}`} 
                                        style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                                    <div className='publicacion-nombre-uno'>{comentario.idUsuario.nombre}</div>
                                </div>
                                <div>{comentario.descripcion}</div>
                            </div>
                        );
                    })
                }
            </div>
          {divComentarModal &&
            <div className="div-comentario" ref={containerRef}>
                <textarea className="div-input-comentario" value={textoPublicacion} onChange={inputAreaTexto} maxLength={200} size={200} style={{ resize: 'none' }}>
                </textarea>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <button className="button-enviar" onClick={publicarComentario}><AiOutlineSend style={{backgroundColor: '333333'}} size={20}/></button>
                </div>  
            </div>
          }
        </div>
                  
    );
};

export default Publicacion;