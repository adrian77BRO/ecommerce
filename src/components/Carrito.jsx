import { Modal } from 'react-bootstrap';

export function Carrito({ carrito, setCarrito, cerrar, mostrar }) {
    const eliminarDelCarrito = (id) => {
        const actualizado = [...carrito];
        actualizado.splice(id, 1);
        setCarrito(actualizado);
    }

    return (
        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header closeButton>
                <Modal.Title>Carrito de compras</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {carrito.length === 0 ? <h4 className='text-center'>No ha agregado ningún producto</h4> :
                    <ul className='list-group'>
                        {carrito.map((item, id) => (
                            <li key={id} className='list-group-item p-0'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <img className='imagen2' src={item.producto.imagen} alt=''></img>
                                    {item.producto.nombre} - {item.cantidad}
                                    <button className='eliminar text-white border-0 rounded-3 w-25 m-2 p-1'
                                        onClick={() => eliminarDelCarrito(id)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>}
            </Modal.Body>
        </Modal>
    );
}