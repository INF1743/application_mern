import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connecterDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import contenuRoutes from "./routes/contenu.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";

dotenv.config();

const app = express();

// ✅ Middlewares AVANT les routes
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/contenus", contenuRoutes);
app.use("/api/reservations", reservationRoutes);

// ✅ Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "API OK ✅" });
});

const PORT = process.env.PORT || 5000;

// ✅ Connexion DB UNE seule fois puis lancement serveur
connecterDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Impossible de lancer le serveur :", err);
  });
