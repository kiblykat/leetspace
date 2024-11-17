import { completedModel } from "../models/Completed.js";

// Get a completed by ID
export const getCompleted = async (req, res) => {
  try {
    const completed = await completedModel.findById(req.params.id);
    if (!completed)
      return res.status(404).json({ error: "completedModel not found" });
    res.json(completed);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new completed
export const createCompleted = async (req, res) => {
  try {
    const { title, link, notes, difficulty, topic } = req.body;
    //todo: +1 times completed everytime completed is done
    const newCompleted = new completedModel({
      title,
      link,
      notes,
      difficulty,
      topic,
    });
    await newCompleted.save();
    res.status(201).json(newCompleted);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all completeds
export const getAllCompleteds = async (req, res) => {
  try {
    const completeds = await completedModel.find();
    res.json(completeds);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update a completed
export const updateCompleted = async (req, res) => {
  try {
    const updatedCompleted = await completedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCompleted)
      return res.status(404).json({ error: "completedModel not found" });
    res.json(updatedCompleted);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a completed
export const deleteCompleted = async (req, res) => {
  try {
    const deletedCompleted = await completedModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCompleted)
      return res.status(404).json({ error: "completedModel not found" });
    res.json({ message: "completedModel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
