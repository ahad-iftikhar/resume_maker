import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  resumes: mongoose.Types.ObjectId[];
}

const userSchema: Schema<UserInterface> = new Schema({
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
    required: [true, "Verify code expiry is required"],
  },
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
});

const User =
  (mongoose.models.User as mongoose.Model<UserInterface>) ||
  mongoose.model<UserInterface>("User", userSchema);

export default User;
