import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setAuthToken } from "../services/api";
import { User } from "lucide-react";
import AideModal from "./AideModal"; // ✅ modal Besoin d'aide

export default function Navbar() {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [estConnecte, setEstConnecte] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOuvert, setMenuOuvert] = useState(false);

  // ✅ state pour le modal
  const [modalAideOuvert, setModalAideOuvert] = useState(false);
  const estAdmin = estConnecte && user?.role === "admin";

  // Charger état connexion au démarrage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setEstConnecte(!!token);

    const u = localStorage.getItem("user");
    setUser(u ? JSON.parse(u) : null);
  }, []);

  // Fermer dropdown si clic dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOuvert(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Déconnexion + redirection accueil
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setEstConnecte(false);
    setUser(null);
    setMenuOuvert(false);
    navigate("/");
  };

  // Style pro + hover animé
  const linkClass = ({ isActive }) =>
    `
    relative text-white text-sm md:text-base px-1 py-1
    transition-colors duration-200
    hover:text-orange-300
    ${isActive ? "font-semibold text-orange-200" : ""}
    after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
    after:w-0 after:bg-orange-300 after:transition-all after:duration-200
    hover:after:w-full
  `;

  // Même style pour un bouton (non NavLink)
  const linkButtonClass = linkClass({ isActive: false });

  return (
    <header className="bg-slate-700 sticky top-0 z-40 shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo (vide) */}
        <Link to="/" className="text-white font-bold text-lg md:text-xl">
          {/* Mets ton logo ici si tu veux */}
        </Link>

        {/* Menu principal */}
        <nav className="flex items-center gap-4 md:gap-8">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>

          {/* ✅ Si connecté : Disponibilités */}
          {estConnecte ? (
            <NavLink to="/disponibilites" className={linkClass}>
              Disponibilités
            </NavLink>
          ) : (
            <>
              {/* ❌ Si pas connecté : Nos offres */}
              <NavLink to="/offres" className={linkClass}>
                Nos offres
              </NavLink>

              {/* ✅ Besoin d'aide → ouvre le modal */}
              <button
                onClick={() => setModalAideOuvert(true)}
                className={linkButtonClass}
              >
                Besoin d’aide
              </button>
            </>
          )}

          {/* Mes réservations uniquement si connecté */}
          {estConnecte && (
            <NavLink to="/mes-reservations" className={linkClass}>
              Mes réservations
            </NavLink>
          )}

          {/* Profil + dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOuvert((v) => !v)}
              className="flex flex-col items-center group"
              aria-haspopup="menu"
              aria-expanded={menuOuvert}
            >
              {/* Icône ronde blanche */}
              <div
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow
                           transition-transform duration-200 group-hover:scale-105"
              >
                <User className="text-slate-800" size={20} />
              </div>

              {/* Nom sous l’icône si connecté */}
              {estConnecte && user?.nom && (
                <span className="text-xs mt-1 text-gray-200">
                  {user.nom}
                </span>
              )}
            </button>

            {/* Dropdown animé */}
            <div
              className={`
                absolute right-0 mt-2 w-64 
                bg-slate-800 text-white rounded-xl shadow-xl border border-white/10 overflow-hidden z-50
                transform transition-all duration-200 origin-top-right
                ${
                  menuOuvert
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }
              `}
            >
              <div className="p-4">
                <h3 className="text-base font-bold">Compte</h3>
                <p className="text-xs text-white/70 mt-1">
                  {estConnecte
                    ? "Accédez à vos réservations."
                    : "Connectez-vous pour réserver et gérer vos rendez-vous."}
                </p>

                {!estConnecte ? (
                  <button
                    onClick={() => {
                      setMenuOuvert(false);
                      navigate("/login");
                    }}
                    className="mt-3 w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
                  >
                    Se connecter
                  </button>
                ) : (
                  <button
                    onClick={logout}
                    className="mt-3 w-full bg-gray-200 hover:bg-gray-300 text-slate-900 font-semibold py-2 rounded-lg transition-colors duration-200"
                  >
                    Se déconnecter
                  </button>
                )}
              </div>

              <div className="border-t border-white/10 py-1">
                {estConnecte ? (
                  <>
                    <button
                      onClick={() => {
                        setMenuOuvert(false);
                        navigate("/disponibilites");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm flex items-center gap-2 transition-colors"
                    >
                      <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center">
                        📅
                      </span>
                      Disponibilités
                    </button>

                    <button
                      onClick={() => {
                        setMenuOuvert(false);
                        navigate("/mes-reservations");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm flex items-center gap-2 transition-colors"
                    >
                      <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center">
                        ✅
                      </span>
                      Mes réservations
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMenuOuvert(false);
                        navigate("/offres");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm flex items-center gap-2 transition-colors"
                    >
                      <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center">
                        🎁
                      </span>
                      Nos offres
                    </button>

                    {/* ✅ Besoin d'aide aussi dans le dropdown */}
                    <button
                      onClick={() => {
                        setMenuOuvert(false);
                        setModalAideOuvert(true);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm flex items-center gap-2 transition-colors"
                    >
                      <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center">
                        ❓
                      </span>
                      Besoin d’aide
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ✅ Modal Besoin d'aide */}
      <AideModal
        ouvert={modalAideOuvert}
        onClose={() => setModalAideOuvert(false)}
      />
    </header>
  );
}
