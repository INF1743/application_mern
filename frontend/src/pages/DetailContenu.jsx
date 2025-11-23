import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams } from "react-router-dom";
 
export default function DetailContenu() {
  const { id } = useParams();
  const [contenu, setContenu] = useState(null);
 
  useEffect(() => {
    api.get("/contenus").then((res) => {
      setContenu(res.data.find((x) => x._id === id));
    });
  }, [id]);
 
  if (!contenu) return <p className="p-6">Chargement...</p>;
 
  return (
<div className="p-6">
<h2 className="text-2xl font-bold">{contenu.titre}</h2>
<p className="mt-2">{contenu.description}</p>
</div>
  );
}

