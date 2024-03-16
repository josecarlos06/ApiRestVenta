"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSale = exports.addShop = exports.addProduct = exports.authLogin = exports.getAllProduct = exports.getProduct = exports.getCategory = void 0;
const connectionDB_1 = require("../database/connectionDB");
const getCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connectionDB_1.pool.query('select * from categoria');
    return result;
});
exports.getCategory = getCategory;
const getProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connectionDB_1.pool.query(`
    SELECT p.idProducto, p.nombre, p.descripcion, p.precio, i.cantidad AS existencias
FROM productos p 
JOIN inventario i ON p.idProducto = i.producto_id where p.categoria_id = $1`, [id]);
    return result;
});
exports.getProduct = getProduct;
const getSale = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connectionDB_1.pool.query(`SELECT vd.*, 
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
});
exports.getSale = getSale;
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connectionDB_1.pool.query(`
    SELECT p.idProducto, p.nombre, p.descripcion, p.fecha, p.precio, p.costo, i.cantidad AS existencias
FROM productos p
JOIN inventario i ON p.idProducto = i.producto_id;`);
    return result;
});
exports.getAllProduct = getAllProduct;
const authLogin = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connectionDB_1.pool.query('select nombre, puesto, id_usuario from usuarios where nombre = $1 and hash_contraseña = $2', [user, password]);
    return result;
});
exports.authLogin = authLogin;
const addProduct = (producto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { nombre, descripcion, precio, costo, existencias, categoria_id } = producto;
    const { rows } = yield connectionDB_1.pool.query(`INSERT INTO productos (nombre,descripcion, fecha, precio, costo, existencias, categoria_id) VALUES ($1,$2,CURRENT_DATE, $3, $4, $5, $6) RETURNING idProducto`, [nombre, descripcion, +precio, +costo, +existencias, +categoria_id]);
    const rowsInventario = connectionDB_1.pool.query(`INSERT INTO inventario (producto_id, cantidad)VALUES ($1,$2)`, [+((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.idproducto), +existencias]);
    return rowsInventario;
});
exports.addProduct = addProduct;
const addShop = (products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario } = products[0];
        const { rows } = yield connectionDB_1.pool.query('INSERT INTO ventas (usuario_id, fecha_venta) VALUES ($1, CURRENT_TIMESTAMP) RETURNING idVenta', [id_usuario]);
        products.forEach((_b) => __awaiter(void 0, [_b], void 0, function* ({ producto_id, cantidad }) {
            var _c;
            const update = yield connectionDB_1.pool.query('UPDATE inventario SET cantidad = cantidad - $1 WHERE producto_id = $2', [cantidad, producto_id]);
            const insert = yield connectionDB_1.pool.query('INSERT INTO venta_detalle (idVenta, idProducto, cantidad) VALUES ($1, $2, $3)', [+((_c = rows[0]) === null || _c === void 0 ? void 0 : _c.idventa), producto_id, +cantidad]);
        }));
        return "operacion con exito";
    }
    catch (error) {
        return "operacion con error";
    }
});
exports.addShop = addShop;
