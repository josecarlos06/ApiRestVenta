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
exports.userController = void 0;
const queryService_1 = require("../services/queryService");
const utils_1 = require("../utils");
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const data = yield (0, queryService_1.authLogin)(name, password);
        const resp = (0, utils_1.modelResponse)(data, 'Correcto', 200);
        res.json(resp);
    }
    catch (error) {
        const resp = (0, utils_1.modelResponse)([], 'Ocurrio un error', 404);
        res.status(404).json(resp);
    }
});
exports.userController = {
    authUser
};
