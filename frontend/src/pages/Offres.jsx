import Navbar from "../components/Navbar";

export default function Offres() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Nos offres</h1>
        <p className="text-gray-600 mt-2">
          Découvrez nos services d’accompagnement.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              Coach de vie personnel
            </h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Un accompagnement bienveillant pour mieux vous connaître,
              surmonter vos blocages et avancer avec confiance.
            </p>
          </div>

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">
              Développement de carrière
            </h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Un soutien structuré pour définir vos objectifs professionnels,
              améliorer vos compétences et bâtir une carrière alignée.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
