import { GraphQLContext } from '@lib';
import { IService } from '@models';
import { Service } from 'schema/ServiceSchema';

export const serviceResolvers = {
  Query: {
    getAllServices: async (): Promise<IService[]> => {
      return await Service.find();
    },
    getServiceById: async (_: unknown, { id }: { id: string }): Promise<IService | null> => {
      return await Service.findById(id);
    }
  },
  Mutation: {
    createService: async (_: unknown, { serviceInput }: any, { user }: GraphQLContext): Promise<IService> => {
      if (!user) throw new Error('Unauthorized');

      const newService = new Service({ providerId: user.id, ...serviceInput });
      return await newService.save();
    },
    deleteService: async (_: unknown, { id }: { id: string }, { user }: GraphQLContext): Promise<boolean> => {
      if (!user) throw new Error('Unauthorized');

      const service = await Service.findById(id);
      if (!service) throw new Error('Service not found');
      if (service.providerId.toString() !== user.id) throw new Error('Permission denied');

      await Service.findByIdAndDelete(id);
      return true;
    }
  }
};
