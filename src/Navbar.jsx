import { Link } from 'react-router-dom';
import { CgHome } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { getPathFoto } from './api/usuario';
import { getUsuario } from './api/usuario';
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

function Navbar({idUser, onLogin}) {

    const [imagePerfil, setImagePerfil] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [mostrarDesplegable, setMostrarDesplegable] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        getUsuario(idUser)
        .then(item => {
            setImageUrl(`http://localhost:8080/imagenes/${item.pathFotoPerfil}`);
            setUsuario(item);
        })
        .catch((err) => {
            console.log(err.message);
        });
    },[])

    function setDesplegable(){
        setMostrarDesplegable(!mostrarDesplegable);
    }

    function cerrarSesion(){
        onLogin(false);
        localStorage.removeItem('id');
        navigate('/')
    }

    return (
        <>
        <nav className="navbar">
            <div>
                <svg viewBox="0 0 24 24" fill="#005ce6" width="40px" height="40px" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1fey0fg xy75621 xni59qk"><path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z"></path></svg>
            </div>
            <div>
                <div style={{marginTop: 5}}><Link to="/Inicio"><CgHome size="30px" className='icono-casa'/></Link></div>
            </div>
            <div className='contenedor-button-perfil'>
                <div style={{color: 'white'}} className="button-perfil" onClick={setDesplegable}>
                    <img src={imageUrl} style={{ width: '40px', height: '40px', borderRadius: '50%' }}></img>
                </div>
            </div>
            
        </nav>
            {mostrarDesplegable && 
            <div className='desplegable-perfil'>
                <div className='foto-nombre'>
                    <img src={imageUrl} style={{ width: '30px', height: '30px', borderRadius: '50%'}}></img>
                    <Link className="nombre-desplegable" to="/Perfil" onClick={setDesplegable}>{usuario.nombre}</Link>
                </div>
                <div className='cerrar-sesion' onClick={cerrarSesion}>
                    <BiLogOut size="30px" className='icono-cerrar-sesion'/>
                    <div>Cerrar sesión</div>
                </div>
            </div>}
        </>
    );
};

export default Navbar;