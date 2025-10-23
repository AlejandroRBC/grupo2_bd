
import { useState, useEffect } from 'react';
import { hotelesService } from '../services/hotelesService';

function HotelesForm({ hotel, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        nombreh: '',
        direccion: '',
        telefonoh: '',
        categoria: ''
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (hotel) {
            setFormData({
                nombreh: hotel.nombreh || '',
                direccion: hotel.direccion || '',
                telefonoh: hotel.telefonoh || '',
                categoria: hotel.categoria || ''
            });
        }
    }, [hotel]);

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
        
        // Validaciones básicas
        if (!formData.nombreh.trim()) {
            setError('El nombre del hotel es requerido');
            return;
        }

        try {
            if (hotel) {
                await hotelesService.actualizarHotel(hotel.idhotel, formData);
            } else {
                await hotelesService.crearHotel(formData);
            }
            onSave();
        } catch (error) {
            console.error('Error al guardar hotel:', error);
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Error al guardar el hotel');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
            <h3>{hotel ? 'Editar Hotel' : 'Nuevo Hotel'}</h3>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffe6e6' }}>
                    {error}
                </div>
            )}

            {hotel && (
                <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold' }}>
                        ID Hotel: {hotel.idhotel}
                    </span>
                </div>
            )}

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="nombreh"
                    placeholder="Nombre del Hotel"
                    value={formData.nombreh}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="tel"
                    name="telefonoh"
                    placeholder="Teléfono del Hotel"
                    value={formData.telefonoh}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="number"
                    name="categoria"
                    placeholder="Categoría (1-5)"
                    value={formData.categoria}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
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
                    {hotel ? 'Actualizar' : 'Crear'}
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

export default HotelesForm;