import { pool } from "../db/conexion.js";

export const reservasController = {
  async obtenerReservasConfirmadas(req, res) {
    try {
      const result = await pool.query(`
        SELECT 
          r.idreserva,
          r.fecha_inicio,
          r.fecha_fin,
          r.costo_total,
          r.estado,
          r.idcliente,
          p.nombre || ' ' || p.apellido as cliente_nombre,
          dr.idhotel,
          dr.nrohabitacion,
          h.nombreh as hotel_nombre,
          hab.tipohabitacion,
          hab.estado as habitacion_estado
        FROM reserva r
        JOIN cliente c ON r.idcliente = c.idcliente
        JOIN persona p ON c.idcliente = p.id
        JOIN detalle_reserva dr ON r.idreserva = dr.idreserva
        JOIN hotel h ON dr.idhotel = h.idhotel
        JOIN habitacion hab ON dr.idhotel = hab.idhotel AND dr.nrohabitacion = hab.nrohabitacion
        WHERE r.estado = 'CONFIRMADA'
        ORDER BY r.fecha_inicio DESC
      `);
      res.json(result.rows);
    } catch (error) {
      console.error("Error al obtener reservas confirmadas:", error);
      res.status(500).json({ error: "Error al obtener reservas confirmadas" });
    }
  }
};