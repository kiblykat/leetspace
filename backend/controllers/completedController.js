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
      .sort({ reviewDate: 1 })
      .limit(2);

    res.status(200).json(dueQuestions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Create a new completed
export const createCompleted = async (req, res) => {
  try {
    const { title, link, tags, difficulty } = req.body;
    const existingCompleted = await completedModel.findOne({ title });
    if (existingCompleted)
      return res
        .status(400)
        .json({ error: "Question already exists in repetition bank" });
    //if difficulty == easy/med/hard, interval should be diff
    let currentInterval;
    switch (difficulty) {
      case "Easy":
        currentInterval = 3;
        break;
      case "Medium":
        currentInterval = 2;
        break;
      case "Hard":
        currentInterval = 1;
        break;
      default:
        currentInterval = 3;
    }

    const newCompleted = new completedModel({
      title,
      link,
      difficulty,
      tags,
      createdDate: Date.now(),
      reviewDate: new Date(Date.now() + currentInterval * 24 * 60 * 60 * 1000), // current date + interval in days
      currentInterval,
      reviewCount: 0,
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

// Update a completed question after reviewing
export const updateCompleted = async (req, res) => {
  try {
    let { _id, userRecallDifficulty, currentInterval } = req.body;

    //userDifficulty duration percentage multiplier
    switch (userRecallDifficulty) {
      case "Easy":
        currentInterval = Math.round((currentInterval *= 120 / 100));
        break;
      case "Medium":
        currentInterval = Math.round((currentInterval *= 130 / 100));
        break;
      case "Hard":
        currentInterval = Math.round((currentInterval *= 140 / 100));
        break;
      default:
        currentInterval = Math.round((currentInterval *= 120 / 100));
    }
    const updatedCompleted = await completedModel.findByIdAndUpdate(
      _id,
      {
        //update reviewDate to current date + currentInterval
        $set: {
          reviewDate: new Date(
            Date.now() + currentInterval * 24 * 60 * 60 * 1000
          ),
          currentInterval: currentInterval,
        },
        //+1 reviewCount everytime completed is done
        $inc: {
          reviewCount: 1,
        },
      },
      { new: true }
    );
    if (!updatedCompleted) {
      return res.status(404).json({ error: "completedModel not found" });
    }
    res.json(updatedCompleted);
  } catch (error) {
    console.log(error);
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
