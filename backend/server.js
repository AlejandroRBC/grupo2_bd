
import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientesRoutes.js";
import hotelesRoutes from "./routes/hotelesRoutes.js";
import ingresosRoutes from "./routes/ingresosRoutes.js";
import reservasRoutes from './routes/reservasRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/clientes", clientesRoutes);
app.use("/hoteles", hotelesRoutes);
app.use('/ingresos',ingresosRoutes);
app.use('/reservas', reservasRoutes);

app.listen(4000, () => console.log("Servidor backend en http://localhost:4000"));