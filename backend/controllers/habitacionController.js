import { pool } from "../db/conexion.js";

export const habitacionController = {
  //Listar todas las habitaciones con su hotel
  async listar(req, res) {
    try {
      const result = await pool.query(`
        SELECT h.idhotel, h.nrohabitacion, h.tipohabitacion, h.capacidad,
               h.estado, h.precio, h.nro_piso, ho.nombreh AS nombre_hotel
        FROM habitacion h
        JOIN hotel ho ON h.idhotel = ho.idhotel
        ORDER BY h.idhotel, h.nrohabitacion;
      `);
      res.json(result.rows);
    } catch (error) {
      console.error("Error al listar habitaciones:", error);
      res.status(500).json({ error: "Error al listar habitaciones" });
    }
  },

  //Crear una nueva habitación asignada a un hotel
  async crear(req, res) {
    const { idhotel, nrohabitacion, tipohabitacion, capacidad, estado, precio, nro_piso } = req.body;

    try {
      await pool.query(
        `INSERT INTO habitacion (idhotel, nrohabitacion, tipohabitacion, capacidad, estado, precio, nro_piso)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [idhotel, nrohabitacion, tipohabitacion, capacidad, estado, precio, nro_piso]
      );
      res.json({ mensaje: "Habitación asignada correctamente al hotel" });
    } catch (error) {
      console.error("Error al crear habitación:", error);
      res.status(500).json({ error: "Error al crear habitación" });
    }
  },

  //Eliminar una habitación (usando clave compuesta)
  async eliminar(req, res) {
    const { idhotel, nrohabitacion } = req.params;
    try {
      await pool.query(
        `DELETE FROM habitacion WHERE idhotel = $1 AND nrohabitacion = $2`,
        [idhotel, nrohabitacion]
      );
      res.json({ mensaje: "Habitación eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar habitación:", error);
      res.status(500).json({ error: "Error al eliminar habitación" });
    }
  },
};
