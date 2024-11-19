import { leetcode_dbModel } from "../models/Leetcode_db.js";

export const getAllLeets = async (req, res) => {
  try {
    const allLeets = await leetcode_dbModel.find();
    res.json(allLeets);
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
};

export const getMatchingLeets = async (req, res) => {
  try {
    const { value } = req.body;

    // Log the received value
    // console.log(`Search value: ${value}`);

    // Use a case-insensitive regex to find partial matches in the 'Question' field
    const response = await leetcode_dbModel.find({
      Question: { $regex: value, $options: "i" },
    });

    // Log the response for debugging
    // console.log(`Matching questions: ${response}`);

    res.status(200).json(response);
  } catch (err) {
    // Log the error for debugging
    console.error("Error fetching matching questions:", err);

    res.status(500).json({ error: "Server error occurred." });
  }
};
