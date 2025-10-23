import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const clientesService = {
    async obtenerClientes() {
        try {
            const response = await axios.get(`${API_URL}/clientes`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            throw error;
        }
    }
};