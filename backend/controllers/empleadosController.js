import { pool } from "../db/conexion.js";

export const empleadosController = {
  async listar(req, res) {
    try {
      const result = await pool.query(`
        select * 
        from persona p, empleado e 
        where p.id = e.idempleado
      `);
      res.json(result.rows);
    } catch (error) {
      console.error("Error al listar empleados:", error);
      res.status(500).json({ error: "Error al listar empleados" });
    }
  },

  async crear(req, res) {
    const { id, nombre, apellido, telefono, fechanaci, sexo, nacionalidad, categoria, email } = req.body;
    try {
      // Insertar persona usando el id manual (CI)
      await pool.query(
        `INSERT INTO persona (id, nombre, apellido, telefono, fechanaci, sexo, nacionalidad)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [id, nombre, apellido, telefono, fechanaci === "" ? null : fechanaci, sexo, nacionalidad]
      );
  
      // Insertar cliente con mismo id
      await pool.query(
        `INSERT INTO cliente (idcliente, categoria, email)
         VALUES ($1,$2,$3)`,
        [id, categoria, email]
      );
  
      res.json({ mensaje: "Cliente agregado correctamente" });
    } catch (error) {
      console.error("Error al crear cliente:", error);
      res.status(500).json({ error: "Error al crear cliente" });
    }
  },

  async actualizar(req, res) {
    const { id } = req.params;
    const { nombre, apellido, telefono, fechanaci, sexo, nacionalidad, categoria, email } = req.body;
    try {
      await pool.query(
        `UPDATE persona
         SET nombre=$1, apellido=$2, telefono=$3, fechanaci=$4, sexo=$5, nacionalidad=$6
         WHERE id=$7`,
        [nombre, apellido, telefono, fechanaci === "" ? null : fechanaci, sexo, nacionalidad, id]
      );

      await pool.query(
        `UPDATE cliente SET categoria=$1, email=$2 WHERE idcliente=$3`,
        [categoria, email, id]
      );
      res.json({ mensaje: "Cliente actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      res.status(500).json({ error: "Error al actualizar cliente" });
    }
  },

  async eliminar(req, res) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM cliente WHERE idcliente=$1", [id]);
      await pool.query("DELETE FROM persona WHERE id=$1", [id]);
      res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      res.status(500).json({ error: "Error al eliminar cliente" });
    }
  },

};
