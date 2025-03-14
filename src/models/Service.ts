import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  providerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  location: string;
  ratings: number;
  createdAt: Date;
  updatedAt: Date;
}
