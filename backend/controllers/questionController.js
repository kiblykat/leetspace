import Question from "../models/Question.js";

// Get a question by ID
export const getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { title, description, difficulty, topic } = req.body;
    const newQuestion = new Question({ title, description, difficulty, topic });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update a question
export const updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQuestion)
      return res.status(404).json({ error: "Question not found" });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion)
      return res.status(404).json({ error: "Question not found" });
    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
