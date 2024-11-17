import { completedModel } from "../models/Completed.js";

// Get a question by ID
export const getQuestion = async (req, res) => {
  try {
    const question = await completedModel.findById(req.params.id);
    if (!question)
      return res.status(404).json({ error: "completedModel not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { title, link, notes, difficulty, topic } = req.body;
    //todo: +1 times completed everytime question is done
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

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await completedModel.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await completedModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuestion)
      return res.status(404).json({ error: "completedModel not found" });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await completedModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedQuestion)
      return res.status(404).json({ error: "completedModel not found" });
    res.json({ message: "completedModel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
