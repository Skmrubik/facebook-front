import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Perfil from './views/Perfil';
import PerfilAjeno from './views/PerfilAjeno';
import Inicio from './views/Inicio';
import { getPathFoto } from './api/usuario';
import PublicacionView from './views/PublicacionView';
import Solicitudes from './views/Solicitudes';
import Amigos from './views/Amigos';
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
          element={<Inicio idUser={idAutentificacion}/>} 
        />
        <Route 
          path="/Perfil" 
          element={<Perfil />} 
        />
        <Route 
          path="/Perfil/:id" 
          element={<PerfilAjeno />} 
        />
        <Route 
          path="/Publicacion/:id" 
          element={<PublicacionView />} 
        />
        <Route 
          path="/Solicitudes" 
          element={<Solicitudes />} 
        />
        <Route 
          path="/Amigos" 
          element={<Amigos />} 
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