import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import { registrarUsuario } from './api/usuario'
import { login } from './api/usuario';
import { subirFoto } from './api/usuario';

function Login({onLogin}) {
  const [count, setCount] = useState(0)
  const [registrarse, setRegistrarse] = useState(false)
  const [nombre, setNombre] = useState("")
  const [lugar, setLugar] = useState("")
  const [correo, setCorreo] = useState("")
  const [password, setPassword] = useState("")
  const [errorNombre, setErrorNombre] = useState("")
  const [errorLugar, setErrorLugar] = useState("")
  const [errorCorreo, setErrorCorreo] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState("");
  const [errorImagen, setErrorImagen] = useState("");
  const [loginCorreo, setLoginCorreo] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const inputLoginCorreo = (e) => {
    setLoginCorreo(e.target.value);
  }

  const inputLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  }

  const inputNombre =(e) =>{
    setNombre(e.target.value);
  }

  const inputLugar = (e) => {
    setLugar(e.target.value);
  }

  const inputCorreo = (e) => {
    setCorreo(e.target.value);
  }

  const inputPassword = (e) => {
    setPassword(e.target.value);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files;
    setFile(file);
  };

  const clickRegistro = () => {
    let noError = true;
    if (nombre=="") {
      setErrorNombre("Nombre está vacío")
      noError= false;
    } else {
      setErrorNombre("")
    }
    if (lugar=="") {
      setErrorLugar("Lugar está vacío")
      noError= false;
    } else {
      setErrorLugar("")
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo=="") {
      setErrorCorreo("Correo está vacío")
      noError= false;
    } else if (!regex.test(correo)){
      setErrorCorreo("El formato no es válido")
    } else {
      setErrorCorreo("")
    }
    if (password=="") {
      setErrorPassword("Password está vacía")
      noError= false;
    } else {
      setErrorPassword("")
    }
    
    if (noError) {
      const usuario = {
        nombre,
        lugar,
        correo,
        password
      }
      registrarUsuario(usuario)
      .then(item => {
        const formData = new FormData();
        console.log("¿Qué hay en el estado?", file);
        const nick = usuario.correo.split('@')[0];
        formData.append('file', file[0], `${nick}.jpg`);
        subirFoto(formData)
        .then(item => {
          if (item) {
            console.log("Subido")
          } else {
            setErrorImagen("Imagen no se ha subido correctamente")
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
        onLogin(true);
        navigate('/Perfil')
      })
      .catch((err) => {
        console.log(err.message);
      });
      
    }
  }

  const loginUsuario = () => {
    login(loginCorreo, loginPassword)
    .then(item => {
      if (item) {
        onLogin(true);
        navigate('/Inicio')
      } else {
        setErrorLogin("Usuario y contraseña incorrectos")
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
  }
  return (
    <>
      <div className='inicio-container'>
        <div className='inicio-bloque-izq'>
          <div className='logo-facebook'>
            <svg viewBox="0 0 24 24" fill="#005ce6" width="70px" height="70px" class="x1lliihq x2lah0s x1k90msu x2h7rmj x1qfuztq x1fey0fg xy75621 xni59qk"><path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z"></path></svg>
          </div>         
          <img  src={'/inicioFacebook.png'} class="imagen-adaptable"/>
        </div>  
        <div className='inicio-bloque-der'>
          {!registrarse?
          <div className='container-login'>
            <input className='bloque-input' style={{marginBottom: '20px'}} placeholder='Correo' onChange={inputLoginCorreo}></input>
            <input className='bloque-input' placeholder='Contraseña' type='password' onChange={inputLoginPassword}></input>
            <p className='error-registro'>{errorLogin}</p>
            <button className='button-entrar' onClick={loginUsuario}>Entrar</button>
            <button className='button-registrarse' onClick={() => setRegistrarse(true)}>Registrarse</button>
          </div>
          :
          <div className='container-registrarse'>
            <button className='button-atras-registro' onClick={() => setRegistrarse(false)}>Atras</button>
            <input className='bloque-input' placeholder='Nombre y Apellidos' onChange={inputNombre}></input>
            <p className='error-registro'>{errorNombre}</p>
            <input className='bloque-input' placeholder='Lugar de Nacimiento' onChange={inputLugar}></input>
            <p className='error-registro'>{errorLugar}</p>
            <input className='bloque-input' placeholder='Correo' onChange={inputCorreo}></input>
            <p className='error-registro'>{errorCorreo}</p>
            <input className='bloque-input' placeholder='Contraseña' type='password' onChange={inputPassword}></input>
            <p className='error-registro'>{errorPassword}</p>
            <input type="file" onChange={handleFileChange} accept="image/*"/>
            <p className='error-registro'>{errorImagen}</p>
            <button className='button-registrarse' onClick={clickRegistro}>Registrarse</button>
          </div>
          }
        </div>
      </div>
    </>
  )
}

export default Login
