import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 mt-12">
      {/* Partie principale */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Colonne 1 : Branding */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Coach<span className="text-orange-400">+</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Plateforme de coaching et de réservation de séances en ligne.
            Planifiez vos rendez-vous, suivez vos disponibilités et gérez vos
            clients en toute simplicité.
          </p>
        </div>

        {/* Colonne 2 : Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Navigation
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/offres"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Nos offres
              </Link>
            </li>
            <li>
              <Link
                to="/disponibilites"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Disponibilités
              </Link>
            </li>
            <li>
              <Link
                to="/mes-reservations"
                className="hover:text-white hover:underline underline-offset-4"
              >
                Mes réservations
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Contact & réseaux */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>contact@coachplus.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+1 (514) 000-0000</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Montréal, Québec</span>
            </li>
          </ul>

          <h4 className="text-sm font-semibold text-white mt-4">
            Suivez-nous
          </h4>
          <div className="mt-2 flex items-center gap-3">
            <button className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
              <Facebook size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
              <Instagram size={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition-colors">
              <Linkedin size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {annee} Coach+. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-gray-300">
              Mentions légales
            </button>
            <button className="hover:text-gray-300">
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
