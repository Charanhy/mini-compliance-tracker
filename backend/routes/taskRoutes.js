const express = require("express");
const router = express.Router();
const { getTasks, getTaskStats, createTask, updateTask } = require("../controllers/taskController");

router.get("/stats/:clientId", getTaskStats);
router.get("/:clientId", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);

module.exports = router;
