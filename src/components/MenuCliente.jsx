import { useState, useEffect } from 'react';

export function Venta({ carrito, setCarrito }) {
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = () => {
        const datos = localStorage.getItem('producto');
        if (datos) {
            setProductos(JSON.parse(datos));
        }
    }

    const agregarAlCarrito = (producto) => {
        const existente = carrito.find((item) => item.producto === producto);

        if (existente) {
            existente.cantidad += 1;
            setCarrito([...carrito]);
            setMensaje('Agregado al carrito');
        } else {
            setCarrito([...carrito, { producto, cantidad: 1 }]);
            setMensaje('Agregado al carrito');
        }
    }

    return productos.length === 0 ? (<h1 className='p-5'>No hay productos en venta</h1>) : (
        <>
            <div className='d-flex justify-content-center'>
                {mensaje !== '' && <div className='mensaje text-white text-center m-2 p-2' role='alert'>{mensaje}</div>}
            </div>
            <div className='container p-3'>
                <div className='row gy-3 row-cols-2'>
                    {productos.map((producto, id) => (
                        <div key={id} className='col-lg-3'>
                            <div className='producto card p-2 m-1'>
                                <img className='imagen rounded-3' src={producto.imagen} alt=''></img>
                                <h3>{producto.nombre}</h3>
                                <h5>${producto.precio}</h5>
                                <div className='d-flex justify-content-center'>
                                    <button className='carrito text-white border-0 rounded-3 w-100 m-2 p-2' type='submit'
                                        onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}