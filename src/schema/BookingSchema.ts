import { BookingStatus, IBooking } from '@models';
import mongoose, { Schema } from 'mongoose';

const BookingSchema = new Schema<IBooking>(
  {
    patronId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.Pending },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
