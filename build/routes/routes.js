"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controllers_1 = require("./../controllers/products-controllers");
const user_controllers_1 = require("./../controllers/user-controllers");
const router = (0, express_1.Router)();
router.get("/getCategory", products_controllers_1.productsController.getAllCategory);
router.get("/getProduct/:id", products_controllers_1.productsController.getOnlyProduct);
router.get("/getProductsAll", products_controllers_1.productsController.getProductAll);
router.get("/getSale", products_controllers_1.productsController.getSales);
router.post("/getProductsAll", products_controllers_1.productsController.getProductAll);
router.post("/addProduct", products_controllers_1.productsController.postProduct);
router.post("/addShop", products_controllers_1.productsController.postShop);
/* user auth */
router.post("/userAuth", user_controllers_1.userController.authUser);
exports.default = router;
