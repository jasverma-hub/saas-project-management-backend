import express from "express";
import { addTask, getTasks } from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import Task from "../models/Task.js";

const router = express.Router();

// Routes base: /api/projects/:id/tasks
router.post("/:id/tasks", verifyToken, addTask);
router.get("/:id/tasks", verifyToken, getTasks);

// Update a task
router.put("/:projectId/tasks/:taskId", verifyToken, async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: "Failed to update task", error: error.message });
    }
  });
  
  // Delete a task
  router.delete("/:projectId/tasks/:taskId", verifyToken, async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.taskId);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
  });
  
export default router;
