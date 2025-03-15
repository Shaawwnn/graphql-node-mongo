import { AuthUserContext, BookingStatus, IBooking } from '@models';
import { Booking } from 'schema/BookingSchema';
import { Service } from 'schema/ServiceSchema';

export const bookingResolvers = {
  Query: {
    getBookingsByUser: async (_: unknown, __: unknown, { authUser }: AuthUserContext): Promise<IBooking[]> => {
      if (!authUser) throw new Error('⚠ Unauthorized User');
      return await Booking.find({ customerId: authUser.uid }).populate('serviceId');
    }
  },
  Mutation: {
    requestBooking: async (_: unknown, { bookingInput }: any, { authUser }: AuthUserContext): Promise<IBooking> => {
      if (!authUser) throw new Error('Unauthorized');

      const service = await Service.findById(bookingInput.serviceId);
      if (!service) throw new Error('Service not found');

      const newBooking = new Booking({
        patronId: authUser.uid,
        agentId: service.agentId,
        serviceId: bookingInput.serviceId,
        date: new Date(bookingInput.date),
        status: BookingStatus.Pending
      });

      return await newBooking.save();
    },
    updateBookingStatus: async (
      _: unknown,
      { id, status }: { id: string; status: BookingStatus },
      { authUser }: AuthUserContext
    ): Promise<IBooking> => {
      if (!authUser) throw new Error('Unauthorized');

      const booking = await Booking.findById(id);
      if (!booking) throw new Error('Booking not found');
      if (booking.agentId.toString() !== authUser.uid) throw new Error('Permission denied');

      booking.status = status;
      return await booking.save();
    }
  }
};
