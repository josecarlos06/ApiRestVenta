"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
/* CONFIGURATION */
dotenv_1.default.config();
const whiteList = ['https://genuine-muffin-4edc99.netlify.app/'];
const customCorsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Request from unauthorized origin"));
        }
    },
};
app.use((0, cors_1.default)(customCorsOptions));
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
