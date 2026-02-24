import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          <div className='container-login'>
            <input className='bloque-input' placeholder='Nick'></input>
            <input className='bloque-input' placeholder='Contraseña' type='password'></input>
            <button className='button-entrar'>Entrar</button>
            <button className='button-registrarse'>Registrarse</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
