import { AuthUserContext, IService, UserRole } from '@models';
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
    createService: async (_: unknown, { serviceInput }: any, { authUser }: AuthUserContext): Promise<IService> => {
      console.log(authUser);
      if (!authUser || authUser.role === UserRole.Patron) throw new Error('Unauthorized');
      const newService = new Service({ agentId: authUser.uid, ...serviceInput });
      return await newService.save();
    },
    deleteService: async (_: unknown, { id }: { id: string }, { authUser }: AuthUserContext): Promise<boolean> => {
      if (!authUser || authUser.role === UserRole.Patron) throw new Error('Unauthorized');

      const service = await Service.findById(id);
      if (!service) throw new Error('Service not found');
      if (service.agentId.toString() !== authUser.uid) throw new Error('Permission denied');

      await Service.findByIdAndDelete(id);
      return true;
    }
  }
};
