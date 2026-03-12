import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUsuario } from '../api/usuario';
import { listarPublicacionesUsuario } from '../api/publicacion';
import { publicarInicio } from '../api/publicacion';
import { subirFoto } from '../api/fotos';
import { guardarPathFoto } from '../api/fotos';
import { GoTrash } from "react-icons/go";
import { borrarPublicacion } from '../api/publicacion';
import Publicacion from '../components/Publicacion';
import { AiOutlineUserAdd } from "react-icons/ai";
import { enviarNotificacion } from '../api/publicacion';
import { solicitudAmistad, buscarAmigo } from '../api/usuario';

const PerfilAjeno = () => {
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlAjeno, setImageUrlAjeno] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [usuarioAjeno, setUsuarioAjeno] = useState(null);
  const [contenido, setContenido] = useState(0);
  const [publicaciones, setPublicaciones] = useState(null);
  const [textoPublicacion, setTextoPublicacion] = useState("");
  const [file, setFile] = useState(null);
  const [nameFile, setNameFile] = useState("");
  const [mostrarBotonAmistad, setMostrarBotonAmistad] = useState(false);

  useEffect(()=>{
    getUsuario(id)
    .then(item => {
        console.log("Usuario ", item)
        setImageUrlAjeno(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
        setUsuarioAjeno(item);
    })
    .catch((err) => {
        console.log(err.message);
    });
    getUsuario(localStorage.getItem('id'))
    .then(item => {
        console.log("Usuario ", item)
        setUsuario(item);
        setImageUrl(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
    })
    .catch((err) => {
        console.log(err.message);
    });
    listarPublicacionesUsuario(id)
    .then(item => {
        console.log("publicaciones ",item)
        setPublicaciones(item)
    })
    .catch((err) => {
        console.log(err.message);
    });
    buscarAmigo(localStorage.getItem('id'),id)
    .then(item => {
      console.log("AMistad " , item);
      if (!item){
        setMostrarBotonAmistad(true);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  },[])

  useEffect(()=>{
    getUsuario(id)
    .then(item => {
        console.log("Usuario ", item)
        setImageUrlAjeno(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
        setUsuarioAjeno(item);
    })
    .catch((err) => {
        console.log(err.message);
    });
    getUsuario(localStorage.getItem('id'))
    .then(item => {
        console.log("Usuario ", item)
        setUsuario(item);
        setImageUrl(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
    })
    .catch((err) => {
        console.log(err.message);
    });
    listarPublicacionesUsuario(id)
        .then(item => {
            console.log("publicaciones ",item)
            setPublicaciones(item)
        })
        .catch((err) => {
            console.log(err.message);
        });
    buscarAmigo(localStorage.getItem('id'),id)
    .then(item => {
      console.log("AMistad " , item);
      if (!item){
        setMostrarBotonAmistad(true);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  },[id])
  function borrarPub(idPublicacion){
    borrarPublicacion(idPublicacion)
      .then(item => {
          console.log("publicacion ",item)
          listarPublicacionesUsuario(id)
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

  const inputAreaTexto = (e) => {
      setTextoPublicacion(e.target.value)
    }
  
    const generarString = (longitud) => {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let resultado = '';
      for (let i = 0; i < longitud; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      return resultado;
    };
  
    const publicar = () => {
      if (file!=null){
        const extension = file[0].name.split('.').pop();
        const pathFoto = generarString(20)+'.'+extension;
        const formData = new FormData();
        console.log("¿Qué hay en el estado?", file);
        formData.append('file', file[0], pathFoto);
        subirFoto(formData)
        .then(item => {
          console.log(item);
          if (item.status == 'ok') {
            console.log("Subido")
            setNameFile("");
            guardarPathFoto(pathFoto)
            .then(item => {
              console.log("Subido")
              const publicacion = {
                idUsuario : localStorage.getItem('id'),
                texto: textoPublicacion,
                idFoto: item
              }
              publicarInicio(publicacion)
              .then(item => {
                  console.log("publicacion ",item)
                  setTextoPublicacion("");
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
            })
            .catch((err) => {
              console.log(err.message);
            });
          } else {
            setErrorImagen("Imagen no se ha subido correctamente")
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      } else {
        const publicacion ={
          idUsuario : localStorage.getItem('id'),
          texto: textoPublicacion,
          idFoto: null,
        }
        publicarInicio(publicacion)
        .then(item => {
            console.log("publicacion ",item)
            setTextoPublicacion("");
            listarPublicacionesUsuario(id)
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
      
      
    }
  
    const handleFileChange = async (e) => {
      const file = e.target.files;
      console.log("FILE ", file[0].name)
      setNameFile(file[0].name)
      setFile(file);
    };
  
  function irPerfilUsuario(idUser){
    if (idUser!= localStorage.getItem('id')){
      navigate("/Perfil/"+idUser)
    } else {
      navigate("/Perfil")
    }
  }
  function solicitudAmist(){
    const notificacion = {
        idUsuario: usuarioAjeno.idUsuario,
        texto: 'Has recibido una petición de amistad de '+ usuario.nombre,
        tipo: 1,
        url: '/Solicitudes',
        leido: false,
    }
    solicitudAmistad(usuarioAjeno.idUsuario, usuario.idUsuario)
    .then(item => {
        console.log("Solicitud ", item);
        enviarNotificacion(notificacion)
        .then(item => {
            console.log("Notificacion ", item);
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
          <div className='perfil-nombre-imagen'>
            <img src={imageUrlAjeno} style={{ width: '120px', height: '120px', marginRight: 15, borderRadius: '50%' }}></img>
            <div>
              <div className='perfil-header-nombre'>{usuarioAjeno.nombre}</div>
              <div className='perfil-header-lugar'>{usuarioAjeno.lugar}</div>
            </div>
          </div>
          {mostrarBotonAmistad &&
          <button className='aniadir-amigo' onClick={solicitudAmist}>
            <AiOutlineUserAdd size="20px" /><div>Añadir amigo</div>
          </button>}
        </div>}
        <div className='perfil-contenido'>
          {contenido == 0 && 
          <div className='perfil-contenido-publicaciones'>
            <div className='container-fotos-amigos'>
            </div>
            <div className='container-publicaciones-usuario'>
              {usuario !=null && <div className='crear-publicacion'>
                <div className='crear-publicacion-header'>
                  <img src={imageUrl} style={{ width: '30px', height: '30px', borderRadius: '50%' }}></img>
                  <div className='publicacion-nombre-uno'>{usuario.nombre}</div>
                </div>
                <textarea className='crear-publicacion-texto' onChange={inputAreaTexto} value={textoPublicacion}></textarea>
                <div style={{marginTop: 10, display: 'flex', justifyContent:'space-between'}}>
                  <button className='button-publicar' onClick={publicar}>Publicar</button>  
                  <p style={{margin: 0}} value={nameFile}>{nameFile}</p>
                  <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*" style={{ display: 'none' }}/>
                  <label htmlFor="file-upload" className="button-subir-foto">
                    Subir foto
                  </label>
                </div>
              </div>}
              {publicaciones &&
                publicaciones.map((publicacion,index)=> {
                  return(
                    <Publicacion publicacion={publicacion} irPerfilUsuario={irPerfilUsuario} borrarPub={borrarPub} />
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

export default PerfilAjeno;