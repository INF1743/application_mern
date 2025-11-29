import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.jpg";

export default function Accueil() {
  const navigate = useNavigate();

  const temoignages = [
    {
      texte:
        "« Les séances m’ont permis de clarifier mes priorités. Je me sens beaucoup plus alignée avec mes choix de vie et de carrière. »",
      auteur: "Sarah, 29 ans",
    },
    {
      texte:
        "« J’avais du mal à passer à l’action. Aujourd’hui, j’ai un plan simple, des objectifs réalistes et surtout l’envie d’avancer. »",
      auteur: "Julien, 34 ans",
    },
    {
      texte:
        "« Un vrai espace d’écoute et de réflexion. J’ai pu reprendre confiance en moi et faire des choix que je repoussais depuis des années. »",
      auteur: "Amélie, 32 ans",
    },
  ];

  const [indexTemoignage, setIndexTemoignage] = useState(0);

  const suivant = () => {
    setIndexTemoignage((i) => (i + 1) % temoignages.length);
  };

  const precedent = () => {
    setIndexTemoignage((i) =>
      i === 0 ? temoignages.length - 1 : i - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndexTemoignage((i) => (i + 1) % temoignages.length);
    }, 8000);
    return () => clearInterval(intervalId);
  }, [temoignages.length]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 bg-white">

        {/* ======================== HERO ======================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 w-full">

          {/* Image gauche — ajustée et descendue */}
          <div className="w-full h-[520px] md:h-[650px] bg-gray-100">
            <img
              src={heroImage}
              alt="Coach"
              className="w-full h-full object-cover object-[center_35%]"
            />
          </div>

          {/* Texte HERO centré */}
          <div className="bg-white px-6 md:px-10 py-10 md:py-16 flex flex-col justify-center">
            <div className="text-center group transition-transform duration-200">

              <p className="inline-block text-[11px] md:text-xs tracking-[0.25em] uppercase text-orange-500 font-semibold mb-4 bg-orange-50 px-4 py-1 rounded-full">
                Coaching & accompagnement
              </p>

              <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 font-serif">
                Je suis Chelsea
              </h2>

              <p className="mt-3 text-xs md:text-sm text-gray-500 font-serif">
                Coach de vie personnel et de carrière
              </p>

              <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-gray-900 font-serif md:leading-snug">
                Je vous aide à trouver et à <br />
                forger votre propre chemin
              </h1>

              <button
                onClick={() => navigate("/disponibilites")}
                className="
                  mt-8 bg-orange-400 hover:bg-orange-500 
                  text-white font-serif font-semibold rounded-full 
                  py-3 md:py-4 px-6 md:px-8 w-full md:w-3/4 mx-auto shadow
                  transform transition-all duration-200
                  hover:-translate-y-[2px] hover:shadow-lg
                "
              >
                Prenez rendez-vous
              </button>
            </div>

            {/* Cartes */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div
                className="
                  bg-slate-700 text-white p-6 rounded-xl shadow-md 
                  flex flex-col justify-between
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
                "
              >
                <div>
                  <h3 className="text-lg font-bold">Coach de vie personnel</h3>
                  <p className="mt-3 text-sm text-gray-100 leading-relaxed">
                    Un accompagnement bienveillant pour vous aider à mieux vous
                    connaître et atteindre un meilleur équilibre dans votre vie.
                  </p>
                </div>

                <button className="mt-6 bg-gray-200 hover:bg-gray-300 text-slate-800 font-semibold py-2 rounded-lg text-sm">
                  Commençons dès aujourd&apos;hui !
                </button>
              </div>

              <div
                className="
                  bg-slate-700 text-white p-6 rounded-xl shadow-md 
                  flex flex-col justify-between
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
                "
              >
                <div>
                  <h3 className="text-lg font-bold">Développement de carrière</h3>
                  <p className="mt-3 text-sm text-gray-100 leading-relaxed">
                    Un soutien professionnel pour définir vos objectifs et aligner
                    votre carrière à vos valeurs.
                  </p>
                </div>

                <button className="mt-6 bg-gray-200 hover:bg-gray-300 text-slate-800 font-semibold py-2 rounded-lg text-sm">
                  Prenez un premier rendez-vous
                </button>
              </div>

            </div>
          </div>

        </section>

        {/* ======================== À PROPOS ======================== */}
        <section className="bg-white">
            <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 py-6 md:py-8 px-0 md:px-0">

            <div className="px-3 md:px-0">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                À propos de mon accompagnement
              </h2>

              <p className="mt-4 text-sm md:text-base text-gray-600 font-serif">
                Mon approche combine écoute active, clarté stratégique et outils
                concrets pour vous aider à avancer à votre rythme.
              </p>

              <p className="mt-3 text-sm md:text-base text-gray-600 font-serif">
                Je vous accompagne avec bienveillance pour surmonter vos
                blocages, vous recentrer et retrouver confiance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-3 md:px-0">

              <div
                className="
                  rounded-2xl p-4 shadow-md border border-sky-200 
                  bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-white
                  hover:-translate-y-1 hover:shadow-lg hover:border-sky-400
                  transition-all duration-200
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-sm font-bold">
                    C
                  </span>
                  <h3 className="text-sm font-semibold text-sky-900">Clarté</h3>
                </div>
                <p className="text-xs text-sky-900/80 leading-relaxed">
                  Mettre des mots sur ce que vous vivez et ce que vous désirez.
                </p>
              </div>

              <div
                className="
                  rounded-2xl p-4 shadow-md border border-emerald-200 
                  bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-white
                  hover:-translate-y-1 hover:shadow-lg hover:border-emerald-400
                  transition-all duration-200
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold">
                    Co
                  </span>
                  <h3 className="text-sm font-semibold text-emerald-900">
                    Confiance
                  </h3>
                </div>
                <p className="text-xs text-emerald-900/80 leading-relaxed">
                  Renforcer l’estime de soi et la capacité à faire des choix.
                </p>
              </div>

              <div
                className="
                  rounded-2xl p-4 shadow-md border border-amber-200 
                  bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-white
                  hover:-translate-y-1 hover:shadow-lg hover:border-amber-400
                  transition-all duration-200
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                    A
                  </span>
                  <h3 className="text-sm font-semibold text-amber-900">
                    Action
                  </h3>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Passer à des actions concrètes et progressives.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ======================== TÉMOIGNAGES ======================== */}
        <section className="bg-white pb-12">
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Ce que disent mes clients
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Les témoignages défilent automatiquement.
            </p>

            <div className="mt-8 relative bg-white border rounded-2xl p-8 shadow-lg overflow-hidden">

              <div className="min-h-[120px] flex flex-col items-center justify-center px-2">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed italic">
                  {temoignages[indexTemoignage].texte}
                </p>
                <p className="mt-4 text-sm md:text-base font-semibold text-gray-600">
                  — {temoignages[indexTemoignage].auteur}
                </p>
              </div>

              <button
                onClick={precedent}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 shadow px-3 py-2 rounded-full hover:bg-gray-100"
              >
                ◀
              </button>

              <button
                onClick={suivant}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 shadow px-3 py-2 rounded-full hover:bg-gray-100"
              >
                ▶
              </button>

              <div className="flex justify-center mt-6 gap-2">
                {temoignages.map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === indexTemoignage
                        ? "bg-slate-700 scale-125"
                        : "bg-gray-300 scale-100"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
