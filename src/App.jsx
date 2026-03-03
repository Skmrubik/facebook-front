import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Perfil from './views/Perfil';
import Inicio from './views/Inicio';
import { getPathFoto } from './api/usuario';
//import Dashboard from './pages/Dashboard';

function App() {
  // En una app real, esto vendría de un Context o un Token en localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idAutentificacion, setIdAutentificacion] = useState(-1);
  const [imagePerfil, setImagePerfil] = useState(null);

  useEffect(()=>{
    console.log("useEffect isAuthenticated")
    const idUsuario = localStorage.getItem('id');
    if (idUsuario!=null){
      setIsAuthenticated(true);
      setIdAutentificacion(idUsuario)
    }
  },[])

  return (
    <Router>
      {/* 1. La Navbar solo se renderiza si isAuthenticated es true */}
      {isAuthenticated && <Navbar idUser={idAutentificacion} onLogin={setIsAuthenticated}/>}

      <Routes>
        {/* Ruta pública: Login */}
        { !isAuthenticated && 
        <Route 
          path="/" 
          element={<Login onLogin={setIsAuthenticated} idAuth={setIdAutentificacion}/>} 
        />}

        {/* Rutas protegidas*/} 
        <Route 
          path="/Inicio" 
          element={<Inicio />} 
        />
        <Route 
          path="/Perfil" 
          element={<Perfil />} 
        />
        <Route 
          path="*" 
          element={<Inicio />} 
        />
      </Routes>
    </Router>
  );
}

export default App