import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-white text-sm md:text-base hover:underline ${
      isActive ? "font-semibold underline" : ""
    }`;

  return (
    <header className="bg-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / nom du site */}
        <Link to="/" className="text-white font-bold text-lg md:text-xl">
          INF1763-01
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-4 md:gap-8">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/disponibilites" className={linkClass}>
            Disponibilités
          </NavLink>
          <NavLink to="/mes-reservations" className={linkClass}>
            Mes réservations
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            Connexion / Enregistrement
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
