import { Router } from "express";
import {
  creerContenu,
  listerContenus,
  supprimerContenu
} from "../controllers/contenu.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", listerContenus);
router.post("/", authRequired, creerContenu);
router.delete("/:id", authRequired, supprimerContenu);

export default router;
