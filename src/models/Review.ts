import mongoose, { Document } from 'mongoose';

export interface IReview extends Document {
  bookingId: mongoose.Types.ObjectId;
  patronId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}
