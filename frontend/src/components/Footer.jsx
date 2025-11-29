// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 mt-12">
      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-12 grid gap-8 md:grid-cols-3">

        {/* Colonne 1 : Identité */}
        <div>
          <h3 className="text-lg font-serif font-semibold">
            Coaching Chelsea
          </h3>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Accompagnement en douceur pour retrouver clarté, confiance
            et alignement dans votre vie personnelle et professionnelle.
          </p>
          <p className="mt-3 text-xs text-slate-400">
            INF1743-SO Développement d’applications web.
          </p>
        </div>

        {/* Colonne 2 : Horaires (remplace Navigation) */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Horaires des rendez-vous
          </h4>

          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li className="flex justify-between">
              <span>Lundi – Vendredi</span>
              <span className="text-slate-300">09h00 – 18h00</span>
            </li>
            <li className="flex justify-between">
              <span>Samedi</span>
              <span className="text-slate-300">10h00 – 15h00</span>
            </li>
            <li className="flex justify-between">
              <span>Dimanche</span>
              <span className="text-slate-400 italic">Fermé</span>
            </li>
          </ul>

          <p className="mt-3 text-xs text-slate-400">
            Les créneaux exacts sont à vérifier dans la page{" "}
            <Link
              to="/disponibilites"
              className="underline hover:text-orange-300"
            >
              Disponibilités
            </Link>.
          </p>
        </div>

        {/* Colonne 3 : Contact / liens utiles */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Contact
          </h4>

          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>
              📧{" "}
              <a
                href="mailto:chelsea.coach@example.com"
                className="hover:text-orange-300 transition-colors"
              >
                chelsea.coach@example.com
              </a>
            </li>
            <li>📞 +1 (438) 555-1234</li>
            <li>📍 Montréal, Québec</li>
          </ul>

          <div className="mt-4 flex gap-3 text-xl">
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm hover:bg-slate-700 cursor-pointer">
              f
            </span>
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm hover:bg-slate-700 cursor-pointer">
              in
            </span>
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm hover:bg-slate-700 cursor-pointer">
              🌐
            </span>
          </div>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Coaching Chelsea – Tous droits réservés.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>Mentions légales</span>
            <span>Politique de confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
