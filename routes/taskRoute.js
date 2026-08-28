const express = require("express");
const router = express.Router();

const {uploader} = require("../util/files.util.js");

const taskLogic = require("../controller/taskController");
const taskLogic_stage4 = require("../controller/taskController_stage4.js");

router.get("/",taskLogic_stage4.getTask);

router.get("/:id",taskLogic_stage4.getTaskById);

router.post("/",taskLogic_stage4.createTask);

router.put("/:id",taskLogic_stage4.editTask);

router.patch("/completed/:id",taskLogic_stage4.IsCompletedTask)

router.patch("/:id/toggle",taskLogic_stage4.ToggleCompletedTask);

router.patch("/:id/file",uploader.single("file"),taskLogic_stage4.uploaderTaskFile );

router.delete("/:id",taskLogic_stage4.DeleteTask);

module.exports = router;