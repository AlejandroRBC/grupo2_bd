import { Router } from "express";
import { reservasController } from "../controllers/reservasController.js";

const router = Router();

router.get("/confirmadas", reservasController.obtenerReservasConfirmadas);

export default router;