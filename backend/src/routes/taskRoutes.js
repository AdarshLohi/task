import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasks); // GET /tasks
router.post("/", createTask); // POST /tasks
router.put("/:id", updateTask); // PUT /tasks/:id
router.delete("/:id", deleteTask); // DELETE /tasks/:id

export default router;
