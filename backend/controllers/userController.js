import { userModel } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const response = await userModel.find();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
