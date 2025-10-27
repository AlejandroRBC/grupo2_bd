import { useEffect, useState } from 'react';
import { obtenerEmpleados, obtenerRegistros, reportarDano } from '../services/danosService';

const DanosForm = ({ onDanoReportado }) => {
  const [formData, setFormData] = useState({
    observaciones: '',
    monto: '',
    idempleado: '',
    idregistro: ''
  });
  const [registros, setRegistros] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [regData, empData] = await Promise.all([
        obtenerRegistros(),
        obtenerEmpleados()
      ]);
      setRegistros(regData);
      setEmpleados(empData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await reportarDano(formData);
      alert('Daño reportado correctamente');
      setFormData({
        observaciones: '',
        monto: '',
        idempleado: '',
        idregistro: ''
      });
      if (onDanoReportado) onDanoReportado();
    } catch (error) {
      alert('Error al reportar daño: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Reportar Daño</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Registro de Ingreso:</label>
            <select 
              className="form-select"
              name="idregistro" 
              value={formData.idregistro} 
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar registro...</option>
              {registros.map(reg => (
                <option key={reg.idregistro} value={reg.idregistro}>
                  {reg.hotel} - Hab. {reg.nrohabitacion} - {reg.cliente} 
                  ({new Date(reg.fecha_entrada).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Empleado que Reporta:</label>
            <select 
              className="form-select"
              name="idempleado" 
              value={formData.idempleado} 
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar empleado...</option>
              {empleados.map(emp => (
                <option key={emp.idempleado} value={emp.idempleado}>
                  {emp.nombre} {emp.apellido} - {emp.cargo}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Observaciones:</label>
            <textarea 
              className="form-control"
              name="observaciones" 
              value={formData.observaciones} 
              onChange={handleChange}
              rows="3"
              required
              placeholder="Describa el daño encontrado..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Monto del Daño (Bs.):</label>
            <input 
              type="number" 
              className="form-control"
              name="monto" 
              value={formData.monto} 
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-warning"
            disabled={loading}
          >
            {loading ? 'Reportando...' : 'REPORTAR DAÑO'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DanosForm;