import { useState } from 'react';
import { Formulario } from '../components/Formulario';
import { Venta } from '../components/MenuCliente';

export function Encabezado() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [opcion, setOpcion] = useState(false);

    const cambiarOpcion = () => setOpcion(!opcion);
    const cerrarModal = () => setMostrarModal(false);
    const abrirModal = () => setMostrarModal(true);
    const cerrarCarrito = () => setMostrarCarrito(false);
    const abrirCarrito = () => setMostrarCarrito(true);

    return (
        <>
            <nav className='encabezado navbar sticky-top navbar-expand-lg'>
                <div className='container-fluid'>
                    <span className='navbar-brand mb-0 h1'>Shop</span>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' checked={opcion} onChange={cambiarOpcion} />
                        <span className='form-check-label'>{opcion ? 'Cliente' : 'Admin'}</span>
                    </div>
                    <button className='carrito text-white border-0 rounded-3 m-2 p-2' type='submit' onClick={opcion ? abrirCarrito : abrirModal}>
                        {opcion ? 'Carrito' : 'Agregar'}</button>
                </div>
            </nav>
            {opcion ? <Venta cerrar={cerrarCarrito} mostrar={mostrarCarrito} /> : <Formulario cerrar={cerrarModal} mostrar={mostrarModal} />}
        </>
    );
}