
import { useState, useEffect } from 'react';
import { clientesService } from '../services/clientesService';

function ListarClientes() {
    // useState, useEffect funciona asi: useState es el elemento que queremos manipular y useEffect es quien le dira que hacer al useState
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const datosClientes = await clientesService.obtenerClientes();
                setClientes(datosClientes);
            } catch (error) {
                console.error('Error al cargar clientes:', error);
            }
        };

        fetchClientes();
    }, [ ]);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Fecha Nacimiento</th>
                        <th>Sexo</th>
                        <th>Nacionalidad</th>
                        <th>Categoría</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.fechanaci}</td>
                            <td>{cliente.sexo}</td>
                            <td>{cliente.nacionalidad}</td>
                            <td>{cliente.categoria}</td>
                            <td>{cliente.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ListarClientes;