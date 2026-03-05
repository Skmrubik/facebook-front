import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { listarPublicaciones } from '../api/publicacion';
import { getUsuario } from '../api/usuario';
import { publicarInicio } from '../api/publicacion';
import { subirFoto } from '../api/fotos';
import { guardarPathFoto } from '../api/fotos';
import { GoTrash } from "react-icons/go";
import { borrarPublicacion } from '../api/publicacion';
import { useNavigate } from 'react-router-dom';

function Inicio(){
  const [publicaciones, setPublicaciones] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [textoPublicacion, setTextoPublicacion] = useState("");
  const [file, setFile] = useState(null);
  const [nameFile, setNameFile] = useState("");
  const navigate = useNavigate();

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
                listarPublicaciones()
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
          listarPublicaciones()
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

  function borrarPub(idPublicacion){
    borrarPublicacion(idPublicacion)
      .then(item => {
          console.log("publicacion ",item)
          listarPublicaciones()
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

  function irPerfilUsuario(idUser){
    if (idUser!= localStorage.getItem('id')){
      navigate("/Perfil/"+idUser)
    } else {
      navigate("/Perfil")
    }
  }
  return (
    <div className='inicio-container'>
      <div className='inicio-container-izq'>

      </div>
      <div className='inicio-container-cen'>
        {usuario !=null && <div className='crear-publicacion'>
          <div className='crear-publicacion-header'>
            <img src={imageUrl} style={{ width: '30px', height: '30px' , borderRadius: '50%'}}></img>
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
        {publicaciones && publicaciones.map((publicacion,index)=> {
          return(
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
          )
        })}
      </div>
      <div className='inicio-container-der'>
        
      </div>
    </div>
  );
};

export default Inicio;