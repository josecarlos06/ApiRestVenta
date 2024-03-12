import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    allowExitOnIdle: true,
});

const connection = async ()=>{
    try {
        await pool.query("SELECT NOW()");
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
connection();