const express = require("express");
const app = express();
const router = require("./routes/taskRoute")

const PORT = 3000;

app.use(express.json());
app.use("/uploads",express.static("uploads"));

app.use("/api/tasks",router);


app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`);
})