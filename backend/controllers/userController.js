import { userModel } from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const uid = req.params.id;
    const response = await userModel.findOne({ uid: uid });
    return res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const response = await userModel.find();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const createUser = async (req, res) => {
  try {
    const userExists = await userModel.findOne({ uid: req.body.uid });
    if (!userExists) {
      await userModel.create(req.body);
    }
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
