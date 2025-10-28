import { useState, useEffect } from 'react';
import { empleadosService } from '../services/empleadoServices';

function EmpleadosForm({ empleado, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        apellido: '',
        telefono: '',
        fechanaci: '',
        sexo: '',
        nacionalidad: '',
        cargo: '',
        salario: '',
        turno: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (empleado) {
            setFormData({
                id: empleado.id || '',
                nombre: empleado.nombre || '',
                apellido: empleado.apellido || '',
                telefono: empleado.telefono || '',
                fechanaci: empleado.fechanaci ? empleado.fechanaci.split('T')[0] : '',
                sexo: empleado.sexo || '',
                nacionalidad: empleado.nacionalidad || '',
                cargo: empleado.cargo || '',
                salario: empleado.salario || '',
                turno: empleado.turno || ''
            });
        }
    }, [empleado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!empleado && !formData.id) {
            setError('El ID (carnet) es requerido');
            return;
        }

        if (!formData.cargo.trim()) {
            setError('El cargo es requerido');
            return;
        }

        if (!formData.salario || formData.salario <= 0) {
            setError('El salario debe ser mayor a 0');
            return;
        }

        try {
            if (empleado) {
                await empleadosService.actualizarEmpleado(empleado.id, formData);
            } else {
                await empleadosService.crearEmpleado(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar empleado:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Error al guardar el empleado');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h3>{empleado ? 'Editar Empleado' : 'Nuevo Empleado'}</h3>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffe6e6' }}>
                    {error}
                </div>
            )}

            <div style={{ marginBottom: '10px' }}>
                {!empleado && (
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
                {empleado && (
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
                    type="date"
                    name="fechanaci"
                    placeholder="Fecha Nacimiento"
                    value={formData.fechanaci}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
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
                
                <input
                    type="text"
                    name="nacionalidad"
                    placeholder="Nacionalidad"
                    value={formData.nacionalidad}
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="cargo"
                    placeholder="Cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px', width: '250px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="number"
                    name="salario"
                    placeholder="Salario"
                    value={formData.salario}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                
                <select 
                    name="turno" 
                    value={formData.turno} 
                    onChange={handleChange}
                    style={{ marginRight: '10px', padding: '5px' }}
                >
                    <option value="">Seleccionar turno</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noche">Noche</option>
                    <option value="Completo">Completo</option>
                </select>
            </div>

            <div>
                <button 
                    type="submit" 
                    style={{ 
                        marginRight: '10px', 
                        padding: '10px 20px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {empleado ? 'Actualizar' : 'Crear'}
                </button>
                <button 
                    type="button" 
                    onClick={onCancel}
                    style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#f44336', 
                        color: 'white', 
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default EmpleadosForm;