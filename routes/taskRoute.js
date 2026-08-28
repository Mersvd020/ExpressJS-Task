const express = require("express");
const router = express.Router();

const {uploader} = require("../util/files.util.js");

const taskLogic = require("../controller/taskController");

router.get("/",taskLogic.getTask);

router.get("/:id",taskLogic.getTaskById);

router.post("/",taskLogic.createTask);

router.put("/:id",taskLogic.editTask);

router.patch("/completed/:id",taskLogic.IsCompletedTask)

router.patch("/:id/file",uploader.single("file"),taskLogic.uploaderTaskFile );

router.delete("/:id",taskLogic.DeleteTask);

module.exports = router;