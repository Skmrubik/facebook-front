import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Login from './Login';
import Perfil from './views/Perfil';
import Inicio from './views/Inicio';
//import Dashboard from './pages/Dashboard';

function App() {
  // En una app real, esto vendría de un Context o un Token en localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {/* 1. La Navbar solo se renderiza si isAuthenticated es true */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Ruta pública: Login */}
        <Route 
          path="/" 
          element={<Login onLogin={() => setIsAuthenticated(true)} />} 
        />

        {/* Rutas protegidas*/} 
        <Route 
          path="/Inicio" 
          element={<Inicio />} 
        />
        <Route 
          path="/Perfil" 
          element={<Perfil />} 
        />
      </Routes>
    </Router>
  );
}

export default App