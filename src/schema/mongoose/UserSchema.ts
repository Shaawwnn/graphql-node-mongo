import { IUser, UserRole } from '@models';
import bcrypt from 'bcrypt';
import mongoose, { Document, Schema, model } from 'mongoose';

// Extend IUser with Document to work with Mongoose
export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

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

// ✅ Password hashing middleware
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash when password is modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument>('User', UserSchema);
