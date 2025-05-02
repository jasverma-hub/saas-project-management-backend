import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Optional: block unauthorized access
    if (req.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = { ...req.body };

    // If password is being updated, hash it
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't return the hashed password
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};
