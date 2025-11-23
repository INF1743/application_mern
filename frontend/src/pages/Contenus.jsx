import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
 
export default function Contenus() {
  const [contenus, setContenus] = useState([]);
 
  useEffect(() => {
    api.get("/contenus").then((res) => setContenus(res.data));
  }, []);
 
  return (
<div className="p-6">
<h2 className="text-2xl font-bold">Contenus</h2>
 
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {contenus.map((c) => (
<div key={c._id} className="border p-4 rounded-lg">
<h3 className="font-semibold">{c.titre}</h3>
<p className="text-sm">{c.description.slice(0, 80)}...</p>
 
            <Link
              to={`/contenus/${c._id}`}
              className="text-blue-600 underline text-sm"
>
              Lire plus
</Link>
</div>
        ))}
</div>
</div>
  );
}