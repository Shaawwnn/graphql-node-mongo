import mongoose from 'mongoose';
import { BookingStatus } from './BookingStatus';

export interface IBooking extends Document {
  customerId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  status: BookingStatus;
  date: Date;
}
