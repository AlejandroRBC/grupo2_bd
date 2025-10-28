import axios from "axios";

const API_URL = "http://localhost:4000";

export const habitacionesService = {
  async obtenerHabitaciones() {
    const res = await axios.get(`${API_URL}/habitaciones`);
    return res.data;
  },
  async crearHabitacion(data) {
    await axios.post(`${API_URL}/habitaciones`, data);
  },
  async eliminarHotel(id, habitacionData) {
        try {
            const response = await axios.delete(`${API_URL}/habitaciones/${id, habitacionData}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar habitacion:', error);
            throw error;
        }
    },
  async actualizarHabitacion(id, habitacionData) {
        try {
            const response = await axios.put(`${API_URL}/habitaciones/${id}`, habitacionData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar habitacion:', error);
            throw error;
        }
    }
};

export const hotelesService = {
  async obtenerHoteles() {
    const res = await axios.get(`${API_URL}/hoteles`);
    return res.data;
  },
};
