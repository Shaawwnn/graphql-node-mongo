import { UserRole } from '@models';
import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pronouns: { type: String, enum: ['he/him', 'she/her', 'they/them'] },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  imageUrl: { type: String },
  bio: { type: String },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now },
  title: { type: String }
});

export const User = model('User', UserSchema);
