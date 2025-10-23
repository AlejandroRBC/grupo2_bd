// Grupo2-Frontend/src/App.jsx
import './App.css'
import { useState } from 'react'
import Clientes from "./modules/Clientes/Clientes";
import Hoteles from "./modules/Hoteles/Hoteles";

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
      </nav>

      <div style={{ padding: '20px' }}>
        {moduloActual === 'clientes' && <Clientes />}
        {moduloActual === 'hoteles' && <Hoteles />}
      </div>
    </div>
  )
}

export default App