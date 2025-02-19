import mongoose, { Schema, Document } from "mongoose";
import { Resume } from "@/Types/resume.types";

export interface User extends Document {
  email: String;
  password: String;
  isVerified: Boolean;
  verifyCode: String;
  verifyCodeExpiry: String;
  resume: mongoose.Types.ObjectId[];
}

const userSchema: Schema<User> = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 8,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verufy code expiry is required"],
  },
  resume: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
});
