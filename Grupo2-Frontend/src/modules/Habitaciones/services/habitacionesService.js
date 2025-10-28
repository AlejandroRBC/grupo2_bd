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
  async eliminarHabitacion(id) {
    await axios.delete(`${API_URL}/habitaciones/${id}`);
  },
};

export const hotelesService = {
  async obtenerHoteles() {
    const res = await axios.get(`${API_URL}/hoteles`);
    return res.data;
  },
};
