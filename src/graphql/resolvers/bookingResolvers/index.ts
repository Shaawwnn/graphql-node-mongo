import { GraphQLContext } from '@lib';
import { BookingStatus, IBooking } from '@models';
import { Booking } from 'schema/BookingSchema';
import { Service } from 'schema/ServiceSchema';

export const bookingResolvers = {
  Query: {
    getBookingsByUser: async (_: unknown, __: unknown, context: GraphQLContext): Promise<IBooking[]> => {
      if (!context.user) throw new Error('⚠ Unauthorized User');
      return await Booking.find({ customerId: context.user.id }).populate('serviceId');
    }
  },
  Mutation: {
    requestBooking: async (_: unknown, { bookingInput }: any, context: GraphQLContext): Promise<IBooking> => {
      if (!context.user) throw new Error('Unauthorized');

      const service = await Service.findById(bookingInput.serviceId);
      if (!service) throw new Error('Service not found');

      const newBooking = new Booking({
        customerId: context.user.id,
        providerId: service.providerId,
        serviceId: bookingInput.serviceId,
        date: new Date(bookingInput.date),
        status: BookingStatus.Pending
      });

      return await newBooking.save();
    },
    updateBookingStatus: async (
      _: unknown,
      { id, status }: { id: string; status: BookingStatus },
      context: GraphQLContext
    ): Promise<IBooking> => {
      if (!context.user) throw new Error('Unauthorized');

      const booking = await Booking.findById(id);
      if (!booking) throw new Error('Booking not found');
      if (booking.providerId.toString() !== context.user.id) throw new Error('Permission denied');

      booking.status = status;
      return await booking.save();
    }
  }
};
