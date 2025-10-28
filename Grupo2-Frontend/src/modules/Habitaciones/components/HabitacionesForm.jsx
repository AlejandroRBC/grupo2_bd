import { useState, useEffect } from "react";
import { habitacionesService, hotelesService } from "../services/habitacionesService";

function HabitacionesForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    idhotel: "",
    nrohabitacion: "",
    tipohabitacion: "",
    capacidad: "",
    estado: "",
    precio: "",
    nro_piso: "",
  });
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    const cargarHoteles = async () => {
      const data = await hotelesService.obtenerHoteles();
      setHoteles(data);
    };
    cargarHoteles();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await habitacionesService.crearHabitacion(form);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: "20px", marginBottom: "20px" }}>
      <h3>Asignar Habitación a Hotel</h3>

      <label>Hotel:</label>
      <select name="idhotel" onChange={handleChange} required>
        <option value="">Seleccionar hotel</option>
        {hoteles.map((h) => (
          <option key={h.idhotel} value={h.idhotel}>
            {h.nombreh}
          </option>
        ))}
      </select>
      <br />

      <input name="nrohabitacion" placeholder="Número Habitación" onChange={handleChange} required />
      <input name="tipohabitacion" placeholder="Tipo" onChange={handleChange} required />
      <input name="capacidad" placeholder="Capacidad" type="number" onChange={handleChange} />
      <input name="estado" placeholder="Estado" onChange={handleChange} />
      <input name="precio" placeholder="Precio" type="number" onChange={handleChange} />
      <input name="nro_piso" placeholder="Nro Piso" type="number" onChange={handleChange} />

      <br /><br />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
        Cancelar
      </button>
    </form>
  );
}

export default HabitacionesForm;
