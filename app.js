import express from "express";
import "dotenv/config.js";

import {user_Route} from "./routes/user_route.js";
import { product_Route } from "./routes/product_route.js";
import {category_Route} from "./routes/category_route.js"

import { globalError_Middleware } from "./middleware/error_Handling.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());


app.use("/user",user_Route);
app.use("/product",product_Route);
app.use("/category",category_Route);


app.use(globalError_Middleware);

app.listen(PORT,()=>console.log(`server is running on port:${PORT}`));