import { Link, NavLink } from 'react-router-dom';
import { MdHomeWork } from 'react-icons/md';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <MdHomeWork size={28} />
          Greek<span>Homes</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/add-property">List Property</NavLink>
        </nav>
      </div>
    </header>
  );
}
