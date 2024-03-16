import { Router } from "express";
import {productsController} from "./../controllers/products-controllers"
import {userController} from "./../controllers/user-controllers"

const router = Router();

router.get("/getCategory", productsController.getAllCategory);
router.get("/getProduct/:id", productsController.getOnlyProduct);
router.get("/getProductsAll", productsController.getProductAll);
router.get("/getSale", productsController.getSales);
router.post("/getProductsAll", productsController.getProductAll);
router.post("/addProduct", productsController.postProduct);
router.post("/addShop", productsController.postShop);




/* user auth */
router.post("/userAuth",userController.authUser);

export default router