import { pool } from "../database/connectionDB"

const getCategory = async () => {
    const result = await pool.query('select * from categoria');
    return result;
}

const getProduct = async (id: number) => {
    const result = await pool.query(`
    SELECT p.idProducto, p.nombre, p.descripcion, p.precio, i.cantidad AS existencias
FROM productos p 
JOIN inventario i ON p.idProducto = i.producto_id where p.categoria_id = $1`, [id]);
    return result;
}

const getSale = async () => {
    const result = await pool.query(`SELECT vd.*, 
    p.nombre AS nombre_producto, 
    p.descripcion AS descripcion_producto,
    p.precio AS precio_producto,
    p.costo AS costo_producto,
    p.existencias AS existencias_producto,
    p.categoria_id AS categoria_producto
FROM venta_detalle vd
JOIN productos p ON vd.idProducto = p.idProducto
JOIN ventas v ON vd.idVenta = v.idVenta
WHERE DATE(v.fecha_venta) = CURRENT_DATE;`);
    return result;
}


const getAllProduct = async () => {
    const result = await pool.query(`
    SELECT p.idProducto, p.nombre, p.descripcion, p.fecha, p.precio, p.costo, i.cantidad AS existencias
FROM productos p
JOIN inventario i ON p.idProducto = i.producto_id;`);
    return result;
}

const authLogin = async (user: string, password: string) => {
    const result = await pool.query('select nombre, puesto, id_usuario from usuarios where nombre = $1 and hash_contraseña = $2', [user, password]);
    return result;
}

const addProduct = async (producto: any) => {
    const { nombre, descripcion, precio, costo, existencias, categoria_id } = producto;
    const {rows} = await pool.query(`INSERT INTO productos (nombre,descripcion, fecha, precio, costo, existencias, categoria_id) VALUES ($1,$2,CURRENT_DATE, $3, $4, $5, $6) RETURNING idProducto`, [nombre, descripcion, +precio, +costo, +existencias, +categoria_id]
    );
    const rowsInventario = pool.query(`INSERT INTO inventario (producto_id, cantidad)VALUES ($1,$2)`, [+rows[0]?.idproducto, +existencias]);
    return rowsInventario;
}


const addShop = async (products: any) => {
    try{
        const {id_usuario} = products[0];
        const { rows } = await pool.query('INSERT INTO ventas (usuario_id, fecha_venta) VALUES ($1, CURRENT_TIMESTAMP) RETURNING idVenta',[id_usuario]);
        products.forEach(async ({producto_id, cantidad }: any) => {
            const update = await pool.query('UPDATE inventario SET cantidad = cantidad - $1 WHERE producto_id = $2', [cantidad, producto_id]);
            const insert = await pool.query('INSERT INTO venta_detalle (idVenta, idProducto, cantidad) VALUES ($1, $2, $3)', [+rows[0]?.idventa,producto_id, +cantidad]);
        });
        return "operacion con exito"
    }catch(error){
        return "operacion con error"
    }
}   
export {
    getCategory,
    getProduct,
    getAllProduct,
    authLogin,
    addProduct,
    addShop,
    getSale
}



