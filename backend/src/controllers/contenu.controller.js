import Contenu from "../modeles/Contenu.js";

export const creerContenu = async (req, res) => {
  const contenu = await Contenu.create(req.body);
  res.status(201).json(contenu);
};

export const listerContenus = async (req, res) => {
  const contenus = await Contenu.find().sort({ createdAt: -1 });
  res.json(contenus);
};

export const supprimerContenu = async (req, res) => {
  await Contenu.findByIdAndDelete(req.params.id);
  res.json({ message: "Supprimé." });
};
