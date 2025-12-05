import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AideModal from "../components/AideModal";

export default function Offres() {
  const navigate = useNavigate();
  const [aideOuvert, setAideOuvert] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* HERO OFFRES */}
        <section className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-500 font-semibold">
              Offres de coaching
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 font-serif">
              Des accompagnements pensés pour vous aider à avancer concrètement
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl">
              Que vous soyez en réflexion personnelle, en transition
              professionnelle ou simplement en quête de clarté, chaque formule
              est conçue pour vous offrir un cadre bienveillant, structuré et
              orienté action.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                ✔ Séances en ligne
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                ✔ Approche personnalisée
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
                ✔ Suivi entre les séances
              </span>
            </div>
          </div>
        </section>

        {/* OFFRES PRINCIPALES */}
        <section className="bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 grid gap-8 md:grid-cols-2">
            {/* Offre 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-white">
                  Coach de vie personnel
                </span>

                <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 font-serif">
                  Retrouver clarté, équilibre et confiance au quotidien
                </h2>

                <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                  Pour les personnes qui souhaitent mieux se connaître,
                  apaiser une période de doute, clarifier leurs priorités et
                  avancer avec plus de douceur et de cohérence dans leur vie
                  personnelle.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• Séances d’1h en ligne, dans un cadre bienveillant</li>
                  <li>• Travail sur les émotions, les croyances et les blocages</li>
                  <li>• Exercices simples à appliquer entre les séances</li>
                  <li>• Possibilité d’adapter le rythme en fonction de vos besoins</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <p className="text-sm text-gray-500">
                  Idéal si vous traversez une phase de remise en question,
                  de fatigue émotionnelle ou de perte de repères.
                </p>
                <button
                  onClick={() => navigate("/disponibilites")}
                  className="w-full inline-flex justify-center items-center rounded-full bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold py-3 transition-colors"
                >
                  Réserver un rendez-vous
                </button>
              </div>
            </div>

            {/* Offre 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-white">
                  Développement de carrière
                </span>

                <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-900 font-serif">
                  Clarifier votre projet professionnel et passer à l’action
                </h2>

                <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                  Pour les personnes qui souhaitent faire évoluer leur carrière,
                  préparer une transition, oser un nouveau projet ou retrouver
                  du sens dans leur travail.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  <li>• Bilan de votre situation et de vos motivations</li>
                  <li>• Identification de vos forces et de vos axes de progression</li>
                  <li>• Construction d’un plan d’action concret et réaliste</li>
                  <li>• Accompagnement dans les décisions et passages à l’action</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <p className="text-sm text-gray-500">
                  Particulièrement adapté si vous hésitez entre plusieurs
                  options, ou si vous avez l’impression de stagner.
                </p>
                <button
                  onClick={() => navigate("/disponibilites")}
                  className="w-full inline-flex justify-center items-center rounded-full bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold py-3 transition-colors"
                >
                  Planifier une séance découverte
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FORMULES & FONCTIONNEMENT */}
        <section className="bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 grid gap-10 md:grid-cols-[1.2fr_1fr]">
            {/* Colonne fonctionnement */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 font-serif">
                Comment se déroule un accompagnement ?
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-600">
                Le processus est simple et structuré, tout en restant flexible
                pour s’adapter à votre rythme et à votre réalité.
              </p>

              <ol className="mt-5 space-y-4 text-sm md:text-base text-gray-700">
                <li>
                  <span className="font-semibold text-slate-800">
                    1. Première prise de contact :
                  </span>{" "}
                  vous choisissez un créneau dans les{" "}
                  <span className="font-semibold">Disponibilités</span> pour
                  une première séance.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">
                    2. Clarification de vos besoins :
                  </span>{" "}
                  nous faisons le point sur votre situation, vos attentes et vos
                  objectifs.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">
                    3. Plan d’accompagnement :
                  </span>{" "}
                  nous définissons ensemble un rythme de séances adapté
                  (ponctuel ou suivi).
                </li>
                <li>
                  <span className="font-semibold text-slate-800">
                    4. Séances & ajustements :
                  </span>{" "}
                  les séances combinent réflexion, outils concrets et mises en
                  action, avec des ajustements réguliers selon votre évolution.
                </li>
              </ol>
            </div>

            {/* Colonne encadré contact */}
            <div className="bg-slate-800 text-white rounded-2xl p-6 md:p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold font-serif">
                  Vous hésitez encore ?
                </h3>
                <p className="mt-3 text-sm text-slate-100 leading-relaxed">
                  Si vous avez une question ou un doute sur la formule la plus
                  adaptée à votre situation, vous pouvez m’écrire en toute
                  simplicité. Je vous répondrai dès que possible.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-2 text-sm">
                <button
                  onClick={() => setAideOuvert(true)}
                  className="w-full inline-flex justify-center items-center rounded-full bg-white text-slate-900 font-semibold py-2.5 hover:bg-slate-100 transition-colors"
                >
                  Poser une question
                </button>
                <button
                  onClick={() => navigate("/disponibilites")}
                  className="w-full inline-flex justify-center items-center rounded-full border border-white/60 text-white font-semibold py-2.5 hover:bg-white/10 transition-colors"
                >
                  Voir les disponibilités
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal d'aide */}
      <AideModal ouvert={aideOuvert} onClose={() => setAideOuvert(false)} />

      <Footer />
    </div>
  );
}
