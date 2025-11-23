import Navbar from "../components/Navbar";
import heroImage from "../assets/hero.jpg";

export default function Accueil() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        
        {/* Colonne gauche : image */}
        <div className="w-full h-[420px] md:h-[650px] bg-gray-100">
          <img
            src={heroImage}
            alt="Coach"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Colonne droite : texte */}
        <div className="bg-white px-6 md:px-10 py-10 md:py-16 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-300">
            Je suis Chelsea
          </h2>

          <p className="mt-3 text-xs md:text-sm text-gray-500 uppercase tracking-wide">
            Coach de vie personnel et de carrière
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            Je vous aide à trouver et à <br />
            forger votre propre chemin
          </h1>

          {/* Bouton orange */}
          <button className="mt-8 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full py-3 md:py-4 px-6 md:px-8 w-full md:w-4/5 shadow">
            Prenez rdv
          </button>

          {/* Cartes */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Carte 1 */}
            <div className="bg-slate-700 text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  Coach de vie personnel
                </h3>

                <p className="mt-3 text-sm text-gray-100 leading-relaxed">
                  Un accompagnement bienveillant pour vous aider à mieux vous 
                  connaître, surmonter vos blocages et atteindre un meilleur 
                  équilibre dans votre vie quotidienne.
                </p>
              </div>

              <button className="mt-6 bg-gray-200 hover:bg-gray-300 text-slate-800 font-semibold py-2 rounded-lg">
                Commençons dès aujourd&apos;hui !
              </button>
            </div>

            {/* Carte 2 */}
            <div className="bg-slate-700 text-white p-6 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">
                  Développement de carrière
                </h3>

                <p className="mt-3 text-sm text-gray-100 leading-relaxed">
                  Un soutien personnalisé pour définir vos objectifs professionnels,
                  renforcer vos compétences et bâtir une carrière épanouissante
                  et alignée à vos valeurs.
                </p>
              </div>

              <button className="mt-6 bg-gray-200 hover:bg-gray-300 text-slate-800 font-semibold py-2 rounded-lg">
                Prenez un premier rendez-vous
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
