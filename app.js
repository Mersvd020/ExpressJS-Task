import express from "express";
import "dotenv/config.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());


app.listen(PORT,()=>console.log(`server is running on port:${PORT}`));