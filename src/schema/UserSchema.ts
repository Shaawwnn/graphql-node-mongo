import { IUser, UserRole } from '@models';
import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';

// Extend IUser with Document to work with Mongoose
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pronouns: { type: String, enum: ['he/him', 'she/her', 'they/them'] },
    contactNumber: { type: String },
    password: { type: String, required: false },
    googleId: { type: String, required: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.Patron },
    imageUrl: { type: String },
    bio: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    title: { type: String }
  },
  { timestamps: true }
);

// ✅ Password hashing middleware
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash when password is modified

  // User provides password only when they register/login using email and password
  // Password is undefined for google auth users
  if (!this.password) return next(); // Only hash when password is modified
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
