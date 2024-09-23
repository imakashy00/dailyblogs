import mongoose, { Schema, model, Document, Types } from "mongoose";

// Journal Interface and Schema
export interface Journal extends Document {
  tag: string;  
  createdAt: Date;
  content: string;
  mood: string;
  user: Types.ObjectId; // Add this if you plan to reference users
}

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyToken: string;
  currentStreak: number;
  longestStreak: number;
  totalWords: number;
  verifyTokenExpiry: Date;
  isVerified: boolean;
  journals: Types.ObjectId[]; // Array of references to Journal
}

const JournalSchema = new Schema<Journal>({
  tag: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  journals: [
    {
      type: Schema.Types.ObjectId,
      ref: "journals",
    },
  ],
});

export const JournalModel =
  mongoose.models.journals ||
  mongoose.model<Journal>("journals", JournalSchema);
export const UserModel =
  mongoose.models.users || mongoose.model<User>("users", UserSchema);
