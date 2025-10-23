import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const baseDatos = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "bdhotel",
    password: "admin",
    port: 5432,
});

// Obtener todos los productos
app.get("/clientes", async (req, res) => {
    const result = await baseDatos.query("select * from cliente c, persona p where c.idcliente = p.id");
    res.json(result.rows);
});
app.listen(4000, () => console.log("Servidor backend en http://localhost:4000"));
