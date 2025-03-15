import { AuthUserContext, IReview, UserRole } from '@models';
import { Review } from 'schema/ReviewSchema';

export const reviewResolvers = {
  Query: {
    getReview: async (_: unknown, { id }: { id: string }): Promise<IReview | null> => {
      return await Review.findById(id);
    },
    getServiceReviews: async (_: unknown, { serviceId }: { serviceId: string }): Promise<IReview[]> => {
      return await Review.find({ serviceId });
    }
  },
  Mutation: {
    addReview: async (_: unknown, { reviewInput }: any, { authUser }: AuthUserContext): Promise<IReview> => {
      if (!authUser || authUser.role !== UserRole.Patron) throw new Error('Unauthorized');

      const review = new Review(reviewInput);

      return await review.save();
    }
  }
};
