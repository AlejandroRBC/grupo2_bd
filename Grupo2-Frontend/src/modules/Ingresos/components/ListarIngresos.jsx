import { useState, useEffect } from 'react';
import { ingresosService } from '../services/ingresosService';
import IngresosForm from './IngresosForm';

function ListarIngresos() {
    const [ingresos, setIngresos] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [detalleIngreso, setDetalleIngreso] = useState(null);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);

    useEffect(() => {
        cargarIngresos();
    }, []);

    const cargarIngresos = async () => {
        try {
            const datosIngresos = await ingresosService.obtenerIngresosActivos();
            setIngresos(datosIngresos);
        } catch (error) {
            console.error('Error al cargar ingresos:', error);
        }
    };

    const handleCrear = () => {
        setMostrarForm(true);
    };

    const handleVerDetalle = async (idregistro) => {
        try {
            const detalle = await ingresosService.obtenerDetalleIngreso(idregistro);
            setDetalleIngreso(detalle);
            setMostrarDetalle(true);
        } catch (error) {
            console.error('Error al obtener detalle:', error);
        }
    };

    const handleGuardar = () => {
        setMostrarForm(false);
        cargarIngresos();
    };

    const handleCancelar = () => {
        setMostrarForm(false);
    };

    const cerrarDetalle = () => {
        setMostrarDetalle(false);
        setDetalleIngreso(null);
    };

    return (
        <>
            <h1>Gestión de Ingresos</h1>
            
            <button 
                onClick={handleCrear} 
                style={{ 
                    marginBottom: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}
            >
                Nuevo Ingreso
            </button>

            {mostrarForm && (
                <IngresosForm 
                    onSave={handleGuardar}
                    onCancel={handleCancelar}
                />
            )}

            {mostrarDetalle && detalleIngreso && (
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '30px', 
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80vh',
                        overflow: 'auto'
                    }}>
                        <h2>Detalle del Ingreso #{detalleIngreso.idregistro}</h2>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Hotel:</strong> {detalleIngreso.nombreh}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Habitación:</strong> {detalleIngreso.nrohabitacion} - {detalleIngreso.tipohabitacion}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Fecha Entrada:</strong> {new Date(detalleIngreso.fecha_entrada).toLocaleDateString()}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Hora Entrada:</strong> {detalleIngreso.hora_entrada}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Reserva:</strong> #{detalleIngreso.idreserva}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Periodo Reserva:</strong> {new Date(detalleIngreso.fecha_inicio).toLocaleDateString()} - {new Date(detalleIngreso.fecha_fin).toLocaleDateString()}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <strong>Costo Total:</strong> ${detalleIngreso.costo_total}
                        </div>
                        
                        <h3>Clientes</h3>
                        <ul>
                            {detalleIngreso.clientes && detalleIngreso.clientes.map((cliente, index) => (
                                <li key={index}>
                                    {cliente.nombre} {cliente.apellido} - {cliente.telefono} - {cliente.email}
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={cerrarDetalle}
                            style={{ 
                                padding: '10px 20px', 
                                backgroundColor: '#6c757d', 
                                color: 'white', 
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: '20px',
                                borderRadius: '4px'
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>ID Registro</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Hotel</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Habitación</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Tipo</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Fecha Entrada</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Hora Entrada</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Clientes</th>
                        <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso) => (
                        <tr key={ingreso.idregistro}>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{ingreso.idregistro}</td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{ingreso.nombreh}</td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{ingreso.nrohabitacion}</td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{ingreso.tipohabitacion}</td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                                {new Date(ingreso.fecha_entrada).toLocaleDateString()}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{ingreso.hora_entrada}</td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{ingreso.clientes || 'N/A'}</td>
                            <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                                <button
                                    onClick={() => handleVerDetalle(ingreso.idregistro)}
                                    style={{ 
                                        padding: '5px 10px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Ver Detalle
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListarIngresos;