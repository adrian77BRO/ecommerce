import { Modal } from 'react-bootstrap';

export function Carrito({ carrito, cerrar, mostrar }) {

    return (
        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header closeButton>
                <Modal.Title>Sus productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {carrito.map((item, id) => (
                        <li key={id}>
                            {item.producto.nombre} - ${item.producto.precio}
                            <button>Eliminar del Carrito</button>
                        </li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
}