import express from "express";
import { habitacionController } from "../controllers/habitacionController.js";

const router = express.Router();

router.get("/", habitacionController.listar);
router.post("/", habitacionController.crear);
router.delete("/:idhotel/:nrohabitacion", habitacionController.eliminar);

export default router;
