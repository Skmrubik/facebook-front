import { useParams } from 'react-router-dom';
import { useEffect, useState , useRef} from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { getPublicacionById } from '../api/publicacion';
import { listarMeGustasPublicacion } from '../api/publicacion';
import { AiOutlineSend } from "react-icons/ai";
import { useOutsideClick } from '../hook/useOutsideClick'
import { comentarPublicacion, listComentariosPublicacion } from "../api/publicacion";

const PublicacionView = () => {
    const { id } = useParams();
    const [publicacion, setPublicacion] = useState(null);
    const [meGustas, setMeGustas] = useState(null);
    const [meGustaPropio, setMeGustaPropio] = useState(false);
    const [divComentarModal,setDivComentarModal] = useState(false);
    const [textoPublicacion, setTextoPublicacion] = useState("");
    const [comentarios, setComentarios]= useState(null);
    const containerRef = useRef(null);

    useOutsideClick(containerRef, () => setDivComentarModal(false));

    useEffect(() => {
        getPublicacionById(id)
            .then(item => {
                setPublicacion(item);
                listarMeGustasPublicacion(item.idPublicacion)
                    .then(item => {
                        setMeGustas(item);
                        item.map((publicacion) => {
                            if (publicacion.idUsuario.idUsuario == localStorage.getItem('id')) {
                                setMeGustaPropio(true);
                            }
                        });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
            .catch((err) => {
                console.log(err.message);
            });
        listComentariosPublicacion(id)
            .then(item => {
                setComentarios(item);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    function meGusta() {
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
    function irPerfilUsuario(idUser) {
        if (idUser != localStorage.getItem('id')) {
            navigate("/Perfil/" + idUser)
        } else {
            navigate("/Perfil")
        }
    }

    function publicarComentario() {
        const comentario = {
            idPublicacion: id,
            idUsuario: localStorage.getItem('id'),
            descripcion: textoPublicacion,
            fecha: new Date().toISOString()
        }
        comentarPublicacion(comentario)
            .then(item => {
                listComentariosPublicacion(id)
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
        <div className='publicacion-container'>
            <div className='inicio-container-izq'>

            </div>
            <div className='inicio-container-cen'>
                {publicacion &&
                    <div className='publicacion'>
                        <div className='publicacion-header'>
                            <div className='publicacion-img-nombre'>
                                <div style={{ display: 'flex' }} onClick={() => irPerfilUsuario(publicacion.idUsuario1.idUsuario)}>
                                    <img src={`http://localhost:8080/imagenes/${publicacion.idUsuario1.pathFotoPerfil}`}
                                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>
                                    <div className='publicacion-nombre-uno'>{publicacion.idUsuario1.nombre}</div>
                                </div>
                                <div className="publicacion-fecha">{publicacion.fecha?.substring(0, 10)}</div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className='publicacion-texto'>{publicacion.texto}</div>
                        {publicacion.idFoto &&
                            <img className='imagen-publicacion' src={`http://localhost:8080/imagenes/${publicacion.idFoto?.path}`}></img>}
                        {meGustas?.length > 0 && <div className="me-gustas-acumulados">
                            <AiFillLike size="20px" />
                            <div style={{ display: 'flex' }}>
                                {meGustas.length == 1 && <div>{meGustas[0].idUsuario.nombre}</div>}
                                {meGustas.length > 1 && <div>{meGustas[0].idUsuario.nombre} y {meGustas.length - 1} más</div>}
                            </div>
                        </div>}
                        <div className='publicacion-interaccion'>
                            {!meGustaPropio &&
                                <div className="container-megusta" onClick={meGusta}>
                                    <AiOutlineLike size="25px" className="icono-megusta" />
                                    <p style={{ margin: 0, marginLeft: 5 }}>Me gusta</p>
                                </div>}
                            {meGustaPropio &&
                                <div className="container-megusta-activo" onClick={meGusta}>
                                    <AiOutlineLike size="25px" className="icono-megusta" />
                                    <p style={{ margin: 0, marginLeft: 5 }}>Me gusta</p>
                                </div>}
                            <div style={{ cursor: "pointer" }} onClick={() => setDivComentarModal(true)}>
                                Comentar
                            </div>
                        </div>
                        <div>
                            {comentarios &&
                                comentarios.map((comentario) => {
                                    return (
                                        <div className="comentario">
                                            <div style={{ display: 'flex' }} onClick={() => irPerfilUsuario(comentario.idUsuario.idUsuario)}>
                                                <img src={`http://localhost:8080/imagenes/${comentario.idUsuario.pathFotoPerfil}`}
                                                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>
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
                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                    <button className="button-enviar" onClick={publicarComentario}><AiOutlineSend style={{ backgroundColor: '333333' }} size={20} /></button>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className='inicio-container-der'>

            </div>
        </div>
    );
};

export default PublicacionView;