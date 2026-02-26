import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Mi App</div>
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/proyectos">Proyectos</Link></li>
        <li><Link to="/sobre-mi">Sobre mí</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;