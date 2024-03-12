import { pool } from "../database/connectionDB"

const getCategory = async ()=>{
    const result = await pool.query('select * from categoria');
    return result;
}

const getProduct = async (id : number)=>{
    const result = await pool.query('select * from productos where categoria_id = $1', [id]);
    return result;
}

const getAllProduct = async ()=>{
    const result = await pool.query('select * from productos');
    return result;
}

export {
    getCategory,
    getProduct,
    getAllProduct 
}