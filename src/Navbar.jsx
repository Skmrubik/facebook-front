import { Link } from 'react-router-dom';
import { CgHome } from "react-icons/cg";
import { useEffect, useState, useRef} from 'react';
import { getPathFoto } from './api/usuario';
import { getUsuario } from './api/usuario';
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { AiFillBell } from "react-icons/ai";
import { getNotificacionesUsuarioNoLeidas } from './api/usuario';
import { marcarComoLeido } from './api/publicacion';
import { useOutsideClick } from './hook/useOutsideClick';
import { listarUsuarios } from './api/usuario';
import Select from 'react-select';

function Navbar({idUser, onLogin}) {

    const [imagePerfil, setImagePerfil] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
    const [mostrarDesplegableNotificaciones, setMostrarDesplegableNotificaciones] = useState(false);
    const [notificaciones, setNotificaciones] = useState(null);
    const containerRef = useRef(null);
    const containerRefNot = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [opcionesUsuarios, setOpcionesUsuarios] = useState([]);
    const navigate = useNavigate();

    const opciones = [
      { value: 'java', label: 'Java (Spring Boot)' },
      { value: 'js', label: 'JavaScript (React)' },
      { value: 'sql', label: 'PostgreSQL' },
    ];
    useEffect(()=>{
        getUsuario(idUser)
        .then(item => {
            setImageUrl(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
            setUsuario(item);
        })
        .catch((err) => {
            console.log(err.message);
        });
        getNotificacionesUsuarioNoLeidas(idUser)
        .then(item => {
            console.log(item)
            setNotificaciones(item);
        })
        .catch((err) => {
            console.log(err.message);
        });
        listarUsuarios()
        .then(item => {
            console.log(item)
            const opcionesUser = []
            if (opcionesUsuarios.length==0){
                item.map((user)=>{
                    opcionesUser.push({value: user.idUsuario, label: user.nombre})
                })
                setOpcionesUsuarios(opcionesUser);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    },[])

    useOutsideClick(containerRef, () => setMostrarDesplegable(false));
    useOutsideClick(containerRefNot, () => setMostrarDesplegableNotificaciones(false));

    function setDesplegable(){
        if (mostrarDesplegableNotificaciones){
            setMostrarDesplegableNotificaciones(false);
        }
        setMostrarDesplegable(!mostrarDesplegable);
    }

    function setDesplegableNotificaciones(){
        if (mostrarDesplegable) {
            setMostrarDesplegable(false)
        }
        setMostrarDesplegableNotificaciones(!mostrarDesplegableNotificaciones)
    }
    function cerrarSesion(){
        onLogin(false);
        localStorage.removeItem('id');
        navigate('/')
    }

    function irNotificacion(notificacion){
        console.log("NOT ", notificacion)
        marcarComoLeido(notificacion.idUsuarioNotificacion)
        .then(item => {
            console.log(item)
            getNotificacionesUsuarioNoLeidas(idUser)
            .then(item => {
                console.log(item)
                setNotificaciones(item);
            })
            .catch((err) => {
                console.log(err.message);
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
        setDesplegableNotificaciones(false);
        navigate(notificacion.url)
    }

    const customStyles = {
      // El contenedor principal
      control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: '#1a1a1a',
        borderColor: state.isFocused ? 'white' : '#242629',
        borderRadius: '8px',
        height: '40px',
        padding: '2px',
        boxShadow: 'none', // Estilo al pasar el ratón
      }),

      // Las opciones del desplegable
      option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isSelected 
          ? 'grey' 
          : state.isFocused ? '#1a1a1a' : '#1a1a1a',
        color: 'white',
        cursor: 'pointer',
        width: '200px',
        '&:active': { backgroundColor: 'grey' }
      }),

      // El menú (la caja que envuelve las opciones)
      menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        marginTop: '4px',
        width: '200px'
      }),

      // El texto que se escribe o selecciona
      singleValue: (baseStyles) => ({
        ...baseStyles,
        color: '#fffffe'
      }),

      // El placeholder
      placeholder: (baseStyles) => ({
        ...baseStyles,
        color: '#94a1b2'
      })
    };

    const manejarCambio = (opcionSeleccionada) => {
        // 1. Acceder a los datos
        console.log("ID seleccionado:", opcionSeleccionada.value);
        console.log("Texto seleccionado:", opcionSeleccionada.label);
        navigate('/Perfil/'+opcionSeleccionada.value)
    };
    return (
        <>
        <nav className="navbar">
            <div className='navbar-primer-contenedor'>
                <div className='svg-facebook'>
                    <svg viewBox="0 0 24 24" fill="#005ce6" width="40px" height="40px" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1fey0fg xy75621 xni59qk"><path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z"></path></svg>
                </div>
                <div className='circulo-blanco-fondo'></div>
                <div style={{width: '200px'}}>
                    <Select
                        styles={customStyles}
                        options={opcionesUsuarios}
                        onChange={manejarCambio}
                        onInputChange={(valor) => setInputValue(valor)}
                        controlShouldRenderValue={false}
                        menuIsOpen={inputValue.length > 0}
                        placeholder="Buscar nombre"
                        isSearchable={true} // Habilita la búsqueda
                        noOptionsMessage={() => "No se encontraron resultados"}
                    />
                </div>
            </div>
            <div>
                <div style={{marginTop: 5}}><Link to="/Inicio"><CgHome size="30px" className='icono-casa'/></Link></div>
            </div>
            <div className='contenedor-button-perfil'>
                <div style={{color: 'white'}} className="button-notificaciones" onClick={setDesplegableNotificaciones}>
                    <div className='circulo-notificaciones'>
                        <AiFillBell size="30px"/>
                    </div>
                    {notificaciones?.length>0 && 
                    <div className='notificacion-cantidad'>
                        {notificaciones.length}
                    </div>}
                </div>
                <div style={{color: 'white'}} className="button-perfil" onClick={setDesplegable}>
                    <img src={imageUrl} style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img>
                </div>
            </div>           
        </nav>
            {mostrarDesplegable && 
            <div className='desplegable-perfil' ref={containerRef}>
                <div className='foto-nombre'>
                    <img src={imageUrl} style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                    <Link className="nombre-desplegable" to="/Perfil" onClick={setDesplegable}>{usuario.nombre}</Link>
                </div>
                <div className='cerrar-sesion' onClick={cerrarSesion}>
                    <BiLogOut size="30px" className='icono-cerrar-sesion'/>
                    <div>Cerrar sesión</div>
                </div>
            </div>}
            {mostrarDesplegableNotificaciones && notificaciones.length>0 &&
            <div className='desplegable-perfil' ref={containerRefNot}>
                {notificaciones.map((notificacion) => {
                    return(
                        <div className='notificacion' onClick={() => irNotificacion(notificacion)}>
                            {notificacion.texto }
                        </div>
                    )
                })}
            </div>}
        </>
    );
};

export default Navbar;