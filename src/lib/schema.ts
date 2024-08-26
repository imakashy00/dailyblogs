import mongoose, { Document, Schema } from "mongoose";

export interface IEmail extends Document {
  email: string;
}

const EmailSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Email ||
  mongoose.model<IEmail>("Email", EmailSchema);
