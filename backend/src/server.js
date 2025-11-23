import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connecterDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import contenuRoutes from "./routes/contenu.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "API OK ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/contenus", contenuRoutes);

const PORT = process.env.PORT || 5000;

connecterDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Serveur lancé sur http://localhost:${PORT}`)
  );
});
