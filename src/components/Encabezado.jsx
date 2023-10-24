import { useState } from 'react';
import { Formulario } from './Formulario';
import { Carrito } from './Carrito';
import { Venta } from './MenuCliente';

export function Encabezado() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const [opcion, setOpcion] = useState(false);
    const [carrito, setCarrito] = useState([]);
    const [editar, setEditar] = useState(null);

    const cambiarOpcion = () => setOpcion(!opcion);
    const cerrarModal = () => setMostrarModal(false);
    const abrirModal = (id) => {
        setMostrarModal(true);
        setEditar(id);
    }
    const cerrarCarrito = () => setMostrarCarrito(false);
    const abrirCarrito = () => setMostrarCarrito(true);

    const contarProductos = () => {
        const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        return total > 9 ? '9+' : total;
    };

    return (
        <>
            <nav className='encabezado navbar sticky-top navbar-expand-lg'>
                <div className='container-fluid'>
                    <span className='navbar-brand mb-0 h1'>Shop</span>
                    <div className='form-check form-switch'>
                        <input className='form-check-input' type='checkbox' role='switch' checked={opcion} onChange={cambiarOpcion} />
                        <span className='form-check-label'>{opcion ? 'Cliente' : 'Admin'}</span>
                    </div>
                    <div>
                        <button className='carrito text-white border-0 rounded-3 m-2 p-2' type='submit' onClick={opcion ? abrirCarrito : abrirModal}>
                            {opcion ? `Carrito` : 'Agregar'}</button>
                        {opcion && <span className="badge bg-primary rounded-pill">{contarProductos()}</span>}
                    </div>
                </div>
            </nav>
            {opcion ? <>
                <Carrito carrito={carrito} setCarrito={setCarrito} cerrar={cerrarCarrito} mostrar={mostrarCarrito} />
                <Venta carrito={carrito} setCarrito={setCarrito} />
            </> : <Formulario abrir={abrirModal} cerrar={cerrarModal} mostrar={mostrarModal} editarItem={editar} />}
        </>
    );
}