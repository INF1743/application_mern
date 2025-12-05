import { Router } from "express";
import {
  envoyerMessageAide,
  listerMessagesAide
} from "../controllers/aide.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";

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

export default router;
