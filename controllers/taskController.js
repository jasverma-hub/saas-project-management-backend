import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const addTask = async (req, res) => {
  const { title, description, status } = req.body;
  const projectId = req.params.id;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    // Optional: ensure the project exists and belongs to the user
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    if (String(project.owner) !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to add tasks to this project." });
    }

    const task = await Task.create({
      title,
      description,
      status: status || "todo",
      project: projectId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    if (String(project.owner) !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to view tasks for this project." });
    }

    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};
