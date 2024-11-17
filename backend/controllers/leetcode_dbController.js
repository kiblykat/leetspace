import { leetcode_dbModel } from "../models/Leetcode_db.js";

export const getAllLeets = async (req, res) => {
  try {
    const allLeets = await leetcode_dbModel.find();
    res.json(allLeets);
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
};
