// Grupo2-Frontend/src/modules/Clientes/components/ClientesForm.jsx
import { useState, useEffect } from 'react';
import { clientesService } from '../services/clientesService';

function ClientesForm({ cliente, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellido: '',
        telefono: '',
        fechanaci: '',
        sexo: '',
        nacionalidad: '',
        categoria: '',
        email: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (cliente) {
            setFormData({
                id: cliente.id || '',
                nombre: cliente.nombre || '',
                apellido: cliente.apellido || '',
                telefono: cliente.telefono || '',
                fechanaci: cliente.fechanaci || '',
                sexo: cliente.sexo || '',
                nacionalidad: cliente.nacionalidad || '',
                categoria: cliente.categoria || '',
                email: cliente.email || ''
            });
        }
    }, [cliente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!cliente && !formData.id) {
            setError('El ID (carnet) es requerido');
            return;
        }

        try {
            if (cliente) {
                await clientesService.actualizarCliente(cliente.id, formData);
            } else {
                await clientesService.crearCliente(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar cliente:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Error al guardar el cliente');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h3>{cliente ? 'Editar Cliente' : 'Nuevo Cliente'}</h3>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffe6e6' }}>
                    {error}
                </div>
            )}

            <div style={{ marginBottom: '10px' }}>
                {!cliente && (
                    <input
                        type="text"
                        name="id"
                        placeholder="ID (Carnet)"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        style={{ marginRight: '10px', padding: '5px', width: '200px' }}
                    />
                )}
                {cliente && (
                    <span style={{ marginRight: '10px', padding: '5px', fontWeight: 'bold' }}>
                        ID: {formData.id}
                    </span>
                )}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="date"
                    name="fechanaci"
                    placeholder="Fecha Nacimiento"
                    value={formData.fechanaci}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <select 
                    name="sexo" 
                    value={formData.sexo} 
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                >
                    <option value="">Seleccionar sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="nacionalidad"
                    placeholder="Nacionalidad"
                    value={formData.nacionalidad}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoría"
                    value={formData.categoria}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
            </div>

            <div>
                <button type="submit" style={{ marginRight: '10px', padding: '5px 10px' }}>
                    {cliente ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={onCancel} style={{ padding: '5px 10px' }}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default ClientesForm;