import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  uid: {
    required: true,
    type: String,
    // unique: true,
  },
  email: {
    required: true,
    type: String,
    // unique: true,
  },
  displayName: {
    required: true,
    type: String,
  },
  photoURL: {
    type: String,
  },
});

export const userModel = mongoose.model("User", UserSchema);
