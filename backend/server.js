import express from "express";
import cors from "cors";
import clientesRoutes from "./routes/clientesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base
app.use("/clientes", clientesRoutes);

app.listen(4000, () => console.log("Servidor backend en http://localhost:4000"));
