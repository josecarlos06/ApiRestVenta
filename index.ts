import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes";



const PORT = process.env.PORT || 8000;
const app: Application = express();
app.use(express.json());
/* CONFIGURATION */
dotenv.config();


const whiteList = ['https://genuine-muffin-4edc99.netlify.app']
const customCorsOptions = {
    origin: (origin: any, callback: any) => {
        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Request from unauthorized origin"));
        }
    },
};
app.use(cors(customCorsOptions));

app.use("/api", router);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});