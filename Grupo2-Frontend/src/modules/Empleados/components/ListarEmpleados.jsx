import { useState, useEffect } from 'react';
import { empleadosService } from '../services/empleadoServices';
import EmpleadosForm from './EmpleadosForm';

function ListarEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [empleadoEdit, setEmpleadoEdit] = useState(null);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        try {
            const datosEmpleados = await empleadosService.obtenerEmpleados();
            setEmpleados(datosEmpleados);
        } catch (error) {
            console.error('Error al cargar empleados:', error);
        }
    };

    const handleCrear = () => {
        setEmpleadoEdit(null);
        setMostrarForm(true);
    };

    const handleEditar = (empleado) => {
        setEmpleadoEdit(empleado);
        setMostrarForm(true);
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
            try {
                await empleadosService.eliminarEmpleado(id);
                cargarEmpleados();
            } catch (error) {
                console.error('Error al eliminar empleado:', error);
                alert(error.response?.data?.error || 'Error al eliminar el empleado');
            }
        }
    };

    const handleGuardar = () => {
        setMostrarForm(false);
        setEmpleadoEdit(null);
        cargarEmpleados();
    };

    const handleCancelar = () => {
        setMostrarForm(false);
        setEmpleadoEdit(null);
    };

    return (
        <>
            <h1>Gestión de Empleados</h1>
            
            <button 
                onClick={handleCrear} 
                style={{ 
                    marginBottom: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#2196F3', 
                    color: 'white', 
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Nuevo Empleado
            </button>

            {mostrarForm && (
                <EmpleadosForm 
                    empleado={empleadoEdit}
                    onSave={handleGuardar}
                    onCancel={handleCancelar}
                />
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Apellido</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Teléfono</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fecha Nac.</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Sexo</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nacionalidad</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Cargo</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Salario</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Turno</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.nombre}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.apellido}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.telefono}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                {empleado.fechanaci ? empleado.fechanaci.split('T')[0] : ''}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.sexo}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.nacionalidad}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.cargo}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>${empleado.salario}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empleado.turno}</td>
                            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                <button 
                                    style={{ 
                                        marginRight: '5px', 
                                        padding: '5px 10px', 
                                        backgroundColor: '#2196F3', 
                                        color: 'white', 
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleEditar(empleado)}
                                >
                                    Editar
                                </button>
                                <button 
                                    style={{ 
                                        padding: '5px 10px', 
                                        backgroundColor: '#f44336', 
                                        color: 'white', 
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleEliminar(empleado.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {empleados.length === 0 && !mostrarForm && (
                <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                    No hay empleados registrados
                </div>
            )}
        </>
    );
}

export default ListarEmpleados;