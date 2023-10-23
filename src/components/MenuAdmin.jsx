export function Productos({ productos, setProductos }) {
    
    const eliminarProducto = (id) => {
        const actualizado = [...productos];
        actualizado.splice(id, 1);
        setProductos(actualizado);
        localStorage.setItem('producto', JSON.stringify(actualizado));
    }

    return productos.length === 0 ? (<h1 className='p-5'>No hay productos en el inventario</h1>) : (
        <div className='container p-3'>
            <div className='row gy-3 row-cols-2'>
                {productos.map((producto, id) => (
                    <div key={id} className='col-lg-3'>
                        <div className='producto card p-2 m-1'>
                            <img className='imagen rounded-3' src={producto.imagen} alt=''></img>
                            <h3>{producto.nombre}</h3>
                            <h5>${producto.precio}</h5>
                            <div className='d-flex justify-content-center'>
                                <button className='eliminar text-white border-0 rounded-3 w-50 m-2 p-2' type='submit'
                                    onClick={() => eliminarProducto(id)}>Eliminar</button>
                                <button className='editar text-white border-0 rounded-3 w-50 m-2 p-2' type='submit'>Editar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}