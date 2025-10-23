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

// Obtener todos los clientes
app.get("/clientes", async (req, res) => {
    try {
        const result = await baseDatos.query("SELECT * FROM cliente c, persona p WHERE c.idcliente = p.id");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener un cliente por ID
app.get("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await baseDatos.query(
            "SELECT * FROM cliente c, persona p WHERE c.idcliente = p.id AND p.id = $1", 
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nuevo cliente
app.post("/clientes", async (req, res) => {
    try {
        const { id, nombre, apellido, telefono, fechanaci, sexo, nacionalidad, categoria, email } = req.body;
        
        // Validar que se proporcione el ID
        if (!id) {
            return res.status(400).json({ error: "El ID (carnet) es requerido" });
        }
        
        // Iniciar transacción
        const client = await baseDatos.connect();
        try {
            await client.query('BEGIN');
            
            // Verificar si el ID ya existe
            const existePersona = await client.query("SELECT id FROM persona WHERE id = $1", [id]);
            if (existePersona.rows.length > 0) {
                return res.status(400).json({ error: "El ID (carnet) ya existe" });
            }
            
            // Insertar en persona
            await client.query(
                `INSERT INTO persona (id, nombre, apellido, telefono, fechanaci, sexo, nacionalidad) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [id, nombre, apellido, telefono, fechanaci, sexo, nacionalidad]
            );
            
            // Insertar en cliente
            await client.query(
                "INSERT INTO cliente (idcliente, categoria, email) VALUES ($1, $2, $3)",
                [id, categoria, email]
            );
            
            await client.query('COMMIT');
            
            res.status(201).json({ 
                message: "Cliente creado exitosamente", 
                id: id 
            });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar cliente
app.put("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, telefono, fechanaci, sexo, nacionalidad, categoria, email } = req.body;
        
        const client = await baseDatos.connect();
        try {
            await client.query('BEGIN');
            
            // Actualizar persona
            await client.query(
                `UPDATE persona SET nombre=$1, apellido=$2, telefono=$3, fechanaci=$4, sexo=$5, nacionalidad=$6 
                 WHERE id=$7`,
                [nombre, apellido, telefono, fechanaci, sexo, nacionalidad, id]
            );
            
            // Actualizar cliente
            await client.query(
                "UPDATE cliente SET categoria=$1, email=$2 WHERE idcliente=$3",
                [categoria, email, id]
            );
            
            await client.query('COMMIT');
            
            res.json({ message: "Cliente actualizado exitosamente" });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar cliente
app.delete("/clientes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        const client = await baseDatos.connect();
        try {
            await client.query('BEGIN');
            
            // Eliminar de cliente primero (por la foreign key)
            await client.query("DELETE FROM cliente WHERE idcliente = $1", [id]);
            
            // Luego eliminar de persona
            await client.query("DELETE FROM persona WHERE id = $1", [id]);
            
            await client.query('COMMIT');
            
            res.json({ message: "Cliente eliminado exitosamente" });
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4000, () => console.log("Servidor backend en http://localhost:4000"));