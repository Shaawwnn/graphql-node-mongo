import mongoose, { Document } from 'mongoose';
import { BookingStatus } from './BookingStatus';

export interface IBooking extends Document {
  patronId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  status: BookingStatus;
  date: Date;
}
