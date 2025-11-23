import { Link } from "react-router-dom";
 
export default function Accueil() {
  return (
<div className="p-6">
<h1 className="text-3xl font-bold">Accueil</h1>
<p className="mt-2">Page d’accueil à refaire comme la vidéo.</p>
 
      <Link to="/contenus" className="text-blue-600 underline mt-4 inline-block">
        Voir les contenus
</Link>
</div>
  );
}