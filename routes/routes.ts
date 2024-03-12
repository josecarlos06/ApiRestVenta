import { Router } from "express";
import {productsController} from "./../controllers/products-controllers"

const router = Router();

router.get("/getCategory", productsController.getAllCategory);
router.get("/getProduct/:id", productsController.getOnlyProduct);
router.get("/getProductsAll", productsController.getProductAll);

export default router