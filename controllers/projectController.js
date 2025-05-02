import Project from "../models/Project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    // Make sure req.userId is passed to the project creation
    const project = await Project.create({
      ...req.body,
      owner: req.userId, // Ensure we are passing the correct userId here
    });

    res.status(201).json(project); // Respond with the created project
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
};

// Get all projects for the authenticated user
export const getProjects = async (req, res) => {
  try {
    // Fetch all projects owned by the authenticated user
    const projects = await Project.find({ owner: req.userId });

    res.status(200).json(projects); // Respond with the list of projects
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
};
