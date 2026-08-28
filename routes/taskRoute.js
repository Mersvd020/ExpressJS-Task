const express = require("express");
const router = express.Router();

const taskLogic = require("../controller/taskController");

router.get("/",taskLogic.getTask);

router.get("/:id",taskLogic.getTaskById);

router.post("/",taskLogic.createTask);

router.put("/:id",taskLogic.editTask);

router.patch("/completed/:id",taskLogic.IsCompletedTask)

router.delete("/:id",taskLogic.DeleteTask);

module.exports = router;