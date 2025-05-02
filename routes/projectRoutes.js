import express from "express";
import Project from "../models/Project.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new project
router.post("/", verifyToken, async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Project name and description are required." });
  }

  try {
    // Create a new project with the owner's ID from the authenticated user
    const newProject = new Project({
      name,
      description,
      owner: req.userId, // Set owner to the authenticated user's ID
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    // Respond with the created project
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
});

// Get all projects for the authenticated user
router.get("/", verifyToken, async (req, res) => {
  try {
    // Find projects where the owner is the authenticated user
    const projects = await Project.find({ owner: req.userId });

    if (!projects.length) {
      return res.status(404).json({ message: "No projects found" });
    }

    // Respond with the list of projects
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
});

export default router;
