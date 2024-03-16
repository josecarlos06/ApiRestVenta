import { authLogin } from "../services/queryService"
import { modelResponse } from "../utils";


const authUser = async (req: any, res: any) => {
    try {
        const {name, password} = req.body;
        const data = await authLogin(name, password);
        const resp = modelResponse(data, 'Correcto', 200);
        res.json(resp)
    } catch (error) {
        const resp = modelResponse([], 'Ocurrio un error', 404)
        res.status(404).json(resp)
    }
}


export const userController = {
    authUser
}