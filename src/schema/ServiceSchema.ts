import { IService } from '@models';
import mongoose, { Schema } from 'mongoose';

const ServiceSchema = new Schema<IService>(
  {
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: false },
    location: { type: String, required: true },
    ratings: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
