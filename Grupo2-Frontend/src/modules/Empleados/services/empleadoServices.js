import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const empleadosService = {
    async obtenerEmpleados() {
        try {
            const response = await axios.get(`${API_URL}/empleados`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            throw error;
        }
    },

    async obtenerClientePorId(id) {
        try {
            const response = await axios.get(`${API_URL}/empleados/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener cliente:', error);
            throw error;
        }
    },

    async crearCliente(clienteData) {
        try {
            const response = await axios.post(`${API_URL}/empleados`, clienteData);
            return response.data;
        } catch (error) {
            console.error('Error al crear cliente:', error);
            throw error;
        }
    },

    async actualizarCliente(id, clienteData) {
        try {
            const response = await axios.put(`${API_URL}/empleados/${id}`, clienteData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar cliente:', error);
            throw error;
        }
    },

    async eliminarCliente(id) {
        try {
            const response = await axios.delete(`${API_URL}/empleados/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            throw error;
        }
    }
};