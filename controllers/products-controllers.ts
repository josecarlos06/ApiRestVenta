import { getCategory, getProduct, getAllProduct } from "../services/queryService"
import { modelResponse } from "../utils";


const getAllCategory = async (req: any, res: any) => {
    try {
        const data = await getCategory();
        const resp = modelResponse(data, 'Correcto', 200);
        res.json(resp)
    } catch (error) {
        const resp = modelResponse([], 'Ocurrio un error', 404)
        res.status(404).json(resp)
    }
}

const getOnlyProduct = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const data = await getProduct(Number(id));
        const resp = modelResponse(data, 'Correcto', 200);
        res.json(resp)
    } catch (error) {
        const resp = modelResponse([], 'Ocurrio un error', 404)
        res.status(404).json(resp)
    }
}

const getProductAll = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const data = await getAllProduct();
        const resp = modelResponse(data, 'Correcto', 200);
        res.json(resp)
    } catch (error) {
        const resp = modelResponse([], 'Ocurrio un error', 404)
        res.status(404).json(resp)
    }
}

export const productsController = {
    getProductAll,
    getOnlyProduct,
    getAllCategory
}