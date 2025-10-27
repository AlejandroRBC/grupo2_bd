
import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientesRoutes.js";
import hotelesRoutes from "./routes/hotelesRoutes.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/clientes", clientesRoutes);
app.use("/hoteles", hotelesRoutes);
app.uses("/empleados", empleadosRoutes);

app.listen(4000, () => console.log("Servidor backend en http://localhost:4000"));