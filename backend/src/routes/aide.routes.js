import { Router } from "express";
import {
  envoyerMessageAide,
  listerMessagesAide,
  marquerTraitre,
} from "../controllers/aide.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js"; // ✅ corrigé

const router = Router();

/**
 * @route POST /api/aide
 * @desc Envoi d’un message d’aide (public)
 */
router.post("/", envoyerMessageAide);

/**
 * @route GET /api/aide
 * @desc Liste des messages d’aide (réservé coach/admin)
 * @access Privé
 */
router.get("/", authRequired, listerMessagesAide);

/**
 * @route PATCH /api/aide/:id/traiter
 * @desc Marquer un message comme traité
 * @access Privé
 */
router.patch("/:id/traiter", authRequired, marquerTraitre);

export default router;
