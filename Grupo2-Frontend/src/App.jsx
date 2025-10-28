// Grupo2-Frontend/src/App.jsx
import './App.css'
import { useState } from 'react'
import Clientes from "./modules/Clientes/Clientes";
import Hoteles from "./modules/Hoteles/Hoteles";
import Ingresos from "./modules/Ingresos/Ingresos";
import Danos from './modules/Danos/Danos';
import Habitaciones from "./modules/Habitaciones/Habitaciones";
import Empleados from "./modules/Empleados/Empleados";

function App() {
  const [moduloActual, setModuloActual] = useState('clientes');

  return (
    <div>
      <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
        <button 
          onClick={() => setModuloActual('clientes')}
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px',
            backgroundColor: moduloActual === 'clientes' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Clientes
        </button>
        <button 
          onClick={() => setModuloActual('hoteles')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: moduloActual === 'hoteles' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Hoteles
        </button>
      <button 
          onClick={() => setModuloActual('ingresos')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: moduloActual === 'ingresos' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Ingresos
        </button>
        <button 
              style={{ 
                padding: '10px 20px',
                backgroundColor: moduloActual === 'danos' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}  
              onClick={() => setModuloActual('danos')}
            >
               Daños
        </button>
        <button 
          onClick={() => setModuloActual('habitaciones')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: moduloActual === 'habitaciones' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Habitaciones
        </button>
        <button 
            onClick={() => setModuloActual('empleados')}
            style={{ 
                padding: '10px 20px',
                backgroundColor: moduloActual === 'empleados' ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}
        >
            Empleados
        </button>
      </nav>
      <div style={{ padding: '20px' }}>
        {moduloActual === 'clientes' && <Clientes />}
        {moduloActual === 'hoteles' && <Hoteles />}
        {moduloActual === 'ingresos' && <Ingresos />}
        {moduloActual === 'danos' && <Danos />}
        {moduloActual === 'habitaciones' && <Habitaciones />}
        {moduloActual === 'empleados' && <Empleados />}

      </div>
    </div>
  )
}

export default App