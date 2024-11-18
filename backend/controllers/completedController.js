import { completedModel } from "../models/Completed.js";

// Get a completed by ID
export const getCompleted = async (req, res) => {
  try {
    const completed = await completedModel.findById(req.params.id);
    if (!completed)
      return res.status(404).json({ error: "completedModel not found" });
    res.json(completed);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getDueCompleteds = async (req, res) => {
  try {
    const today = new Date(); //get Current Date
    const dueQuestions = await completedModel
      .find({
        reviewDate: { $lte: today },
      })
      .sort({ reviewDate: asc })
      .limit(2);

    res.json(dueQuestions);
  } catch (err) {
    res.status(500).json({ err: err });
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
      createdDate: Date.now(),
      reviewDate: Date.now(),
      timesReviewed: 0,
    });
    let savedCompleted = await completedModel.create(newCompleted);
    res.status(201).json(savedCompleted);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all completeds
export const getAllCompleteds = async (req, res) => {
  try {
    const completeds = await completedModel.find();
    res.json(completeds);
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
  }
};
