import { useState, useEffect } from 'react';
import { ingresosService } from '../services/ingresosService';
import { clientesService } from '../../Clientes/services/clientesService';

function IngresosForm({ onSave, onCancel }) {
    const [formData, setFormData] = useState({
        idreserva: '',
        idhotel: '',
        nrohabitacion: '',
        fecha_entrada: new Date().toISOString().split('T')[0],
        hora_entrada: new Date().toTimeString().split(':').slice(0, 2).join(':'),
        idclientes: []
    });

    const [reservas, setReservas] = useState([]);
    const [clientesDisponibles, setClientesDisponibles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sqlQuery, setSqlQuery] = useState('');
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        cargarReservas();
        cargarClientes();
    }, []);

    const cargarReservas = async () => {
        try {
            const data = await ingresosService.obtenerReservasConfirmadas();
            setReservas(data);
        } catch (error) {
            console.error('Error al cargar reservas:', error);
            setError('No se pudieron cargar las reservas');
        }
    };

    const cargarClientes = async () => {
        try {
            const data = await clientesService.obtenerClientes();
            setClientesDisponibles(data);
        } catch (error) {
            console.error('Error al cargar clientes:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'idreserva') {
            const reservaId = Number(value);
            const reservaSeleccionada = reservas.find(r => Number(r.idreserva) === reservaId);
            if (reservaSeleccionada) {
                setFormData(prev => ({
                    ...prev,
                    idreserva: reservaId,
                    idhotel: reservaSeleccionada.idhotel || '',
                    nrohabitacion: reservaSeleccionada.nrohabitacion || ''
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (error) setError('');
        setMensaje('');
    };

    const handleClienteChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(Number(options[i].value));
            }
        }
        setFormData(prev => ({
            ...prev,
            idclientes: selected
        }));
        setMensaje('');
    };

    // **Nuevo useEffect para SQL en tiempo real**
    useEffect(() => {
        if (!formData.idreserva || !formData.idhotel || !formData.nrohabitacion || formData.idclientes.length === 0) {
            setSqlQuery('');
            return;
        }

        const sql = `
INSERT INTO ingresos (idreserva, idhotel, nrohabitacion, fecha_entrada, hora_entrada, idclientes)
VALUES (${formData.idreserva}, ${formData.idhotel}, ${formData.nrohabitacion}, '${formData.fecha_entrada}', '${formData.hora_entrada}', '{${formData.idclientes.join(',')}}');
        `;
        setSqlQuery(sql);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMensaje('');

        if (!formData.idreserva || !formData.idhotel || !formData.nrohabitacion) {
            setError('Todos los campos obligatorios deben ser completados');
            setLoading(false);
            return;
        }

        if (formData.idclientes.length === 0) {
            setError('Debe seleccionar al menos un cliente');
            setLoading(false);
            return;
        }

        try {
            await ingresosService.crearIngreso(formData);
            setMensaje('Inserción realizada correctamente');
            onSave();
        } catch (error) {
            console.error('Error al crear ingreso:', error);
            setError('Error al crear el ingreso');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            marginBottom: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
        }}>
            {error && (
                <div style={{
                    color: 'red',
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#ffe6e6',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}

            {/* Selección de reserva */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Reserva: *
                </label>
                <select
                    name="idreserva"
                    value={formData.idreserva || ""}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px'
                    }}
                >
                    <option value="">Seleccionar reserva confirmada</option>
                    {reservas.map(reserva => (
                        <option key={reserva.idreserva} value={reserva.idreserva}>
                            Reserva #{reserva.idreserva} - {reserva.cliente_nombre} - {reserva.hotel_nombre} - Hab: {reserva.nrohabitacion}
                        </option>
                    ))}
                </select>
            </div>

            {/* Hotel y habitación */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hotel: *</label>
                    <input
                        type="number"
                        name="idhotel"
                        value={formData.idhotel}
                        readOnly
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#e9ecef',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Habitación: *</label>
                    <input
                        type="number"
                        name="nrohabitacion"
                        value={formData.nrohabitacion}
                        readOnly
                        style={{
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#e9ecef',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
            </div>

            {/* Fecha y hora */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de Entrada: *</label>
                    <input
                        type="date"
                        name="fecha_entrada"
                        value={formData.fecha_entrada}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hora de Entrada: *</label>
                    <input
                        type="time"
                        name="hora_entrada"
                        value={formData.hora_entrada}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
            </div>

            {/* Selección de clientes */}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Clientes:</label>
                <select
                    multiple
                    onChange={handleClienteChange}
                    value={formData.idclientes.map(String)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        minHeight: '120px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '14px'
                    }}
                >
                    {clientesDisponibles.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.id} - {cliente.nombre} {cliente.apellido}
                        </option>
                    ))}
                </select>
                <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                    Clientes seleccionados: {formData.idclientes.length}
                </small>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: loading ? '#6c757d' : '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Guardando...' : 'Registrar Ingreso'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Cancelar
                </button>
            </div>

            {/* Mostrar SQL en tiempo real */}
            {sqlQuery && (
                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#e6f7ff',
                    border: '1px solid #91d5ff',
                    borderRadius: '4px',
                    fontFamily: 'monospace'
                }}>
                    <strong>SQL generado:</strong>
                    <pre>{sqlQuery}</pre>
                </div>
            )}
            {mensaje && (
                <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#d9f7be',
                    border: '1px solid #b7eb8f',
                    borderRadius: '4px'
                }}>
                    {mensaje}
                </div>
            )}
        </form>
    );
}

export default IngresosForm;
