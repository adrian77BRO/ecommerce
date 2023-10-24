import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Inventario } from './MenuAdmin';

export function Formulario({ abrir, cerrar, mostrar, editarItem }) {
    
    const [productos, setProductos] = useState([]);
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        imagen: ''
    });
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const datos = localStorage.getItem('producto');
        if (datos) {
            setProductos(JSON.parse(datos));
        }
    }, []);

    const manejarCambio = (event) => {
        setProducto({
            ...producto,
            [event.target.name]: event.target.value
        });
    };

    const agregarProducto = (e) => {
        e.preventDefault();

        if (producto.nombre === '' || producto.precio === '' || producto.imagen === '') {
            setMensaje('Campos requeridos');
            return;
        }
        if (parseFloat(producto.precio) <= 0) {
            setMensaje('Números negativos inválidos');
            return;
        }

        const actualizado = [...productos, producto];

        if (editarItem !== null) {
            actualizado[editarItem] = { ...actualizado[editarItem], ...producto };
        } else {
            actualizado.push(producto);
        }

        setProductos(actualizado);
        localStorage.setItem('producto', JSON.stringify(actualizado));

        setProducto({
            nombre: '',
            precio: '',
            imagen: ''
        });
        setMensaje('');
        cerrar();
    };

    const editarProducto = (id) => {
        abrir(id);
        const editado = productos[id];
        setProducto({
            nombre: editado.nombre,
            precio: editado.precio,
            imagen: editado.imagen,
        })
    };

    return (
        <>
            <Modal show={mostrar} onHide={cerrar}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar nuevo producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3 p-3'>
                        <label htmlFor='nombre' className='form-label'>Nombre:</label>
                        <input className='form-control' id='nombre'
                            type='text' name='nombre' value={producto.nombre} onChange={manejarCambio} />
                    </div>
                    <div className='mb-3 p-3'>
                        <label htmlFor='precio' className='form-label'>Precio:</label>
                        <input className='form-control' id='precio'
                            type='number' name='precio' value={producto.precio} onChange={manejarCambio} />
                    </div>
                    <div className='mb-3 p-3'>
                        <label htmlFor='imagen' className='form-label'>Imagen:</label>
                        <input className='form-control' id='imagen' placeholder='URL de la imagen'
                            type='text' name='imagen' value={producto.imagen} onChange={manejarCambio} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex justify-content-around'>
                        {mensaje !== '' && <div className='error text-white text-center m-2 p-2' role='alert'>{mensaje}</div>}
                        <button className='carrito text-white border-0 rounded-3 m-2 p-2' type='submit'
                            onClick={agregarProducto}>Guardar</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Inventario productos={productos} setProductos={setProductos} editar={editarProducto} />
        </>
    );
}