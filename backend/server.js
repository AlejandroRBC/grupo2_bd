import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "bdmueble",
  password: "tu_contraseña",
  port: 5432,
});

// Obtener todos los productos
app.get("/productos", async (req, res) => {
  const result = await pool.query("SELECT * FROM producto");
  res.json(result.rows);
});

// Insertar un producto
app.post("/productos", async (req, res) => {
  const { nombre, material, color, precio } = req.body;
  await pool.query(
    "INSERT INTO producto (nombre, material, color, precio) VALUES ($1, $2, $3, $4)",
    [nombre, material, color, precio]
  );
  res.json({ mensaje: "Producto agregado" });
});

// Actualizar precio (dispara trigger)
app.put("/productos/:id", async (req, res) => {
  const { precio } = req.body;
  await pool.query("UPDATE producto SET precio = $1 WHERE idproducto = $2", [
    precio,
    req.params.id,
  ]);
  res.json({ mensaje: "Precio actualizado" });
});

app.listen(4000, () => console.log("Servidor backend en http://localhost:4000"));
