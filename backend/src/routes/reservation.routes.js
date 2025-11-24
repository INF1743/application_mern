import { Router } from "express";
import {
  creerReservation,
  mesReservations,
  annulerReservation,
  creneauxDisponibles
} from "../controllers/reservation.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

// Obtenir créneaux
router.get("/creneaux", creneauxDisponibles);

// Mes réservations
router.get("/", authRequired, mesReservations);

// Créer une réservation
router.post("/", authRequired, creerReservation);

// Annuler une réservation
router.patch("/:id/annuler", authRequired, annulerReservation);

export default router;
