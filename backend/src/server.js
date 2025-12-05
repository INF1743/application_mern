import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connecterDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import contenuRoutes from "./routes/contenu.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import aideRoutes from "./routes/aide.routes.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES GLOBAUX
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   ROUTE SANTÉ
======================= */
app.get("/api/health", (req, res) => {
  res.json({ message: "API OK ✅" });
});

/* =======================
   ROUTES API
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/contenus", contenuRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/aide", aideRoutes);

/* =======================
   GESTION ERREURS 404
======================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée ❌" });
});

/* =======================
   LANCEMENT SERVEUR
======================= */
const PORT = process.env.PORT || 5000;

connecterDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur connexion MongoDB :", err.message);
    process.exit(1);
  });
