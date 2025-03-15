import { IReview } from '@models';
import mongoose, { Schema } from 'mongoose';

const ReviewSchema: Schema = new Schema<IReview>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    patronId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
  },
  {
    timestamps: true
  }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
