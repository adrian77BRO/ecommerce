import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Productos } from '../components/MenuAdmin';

export function Formulario({ cerrar, mostrar }) {
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
    });
    const [imagen, setImagen] = useState(null);
    const [productos, setProductos] = useState([]);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
    };

    const agregarProducto = (e) => {
        e.preventDefault();

        setProducto({
            ...producto,
            imagen
        })
        if (producto.nombre === '' || producto.precio === '') {
            alert('Campos requeridos');
            return;
        }
        if (parseFloat(producto.precio) <= 0) {
            alert('Números negativos inválidos');
            return;
        }

        setProductos([...productos, producto]);
        localStorage.setItem('producto', JSON.stringify([...productos, producto]));

        setProducto({
            nombre: '',
            precio: '',
            imagen: null
        });
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
                        <input className='form-control' id='imagen'
                            type='file' accept="image/*" onChange={handleImageChange} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='carrito text-white border-0 rounded-3 m-2 p-2' type='submit' onClick={agregarProducto}>Guardar</button>
                </Modal.Footer>
            </Modal>
            <Productos productos={productos} setProductos={setProductos} />
        </>
    );
}