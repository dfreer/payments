import { apiServiceTypes } from '@/inc/api';
import { useApplicationStore } from '@/stores';
import BaseService from './baseService';

class Service extends BaseService {
   constructor() {
      super({ apiServiceType: apiServiceTypes.AUTH });
   }

   async fetchUserDetailsFromAppCore(userIds) {
      try {
         const { config } = useApplicationStore();
         const results = await this.api.get(
            `companies/${config.companyId}/users`,
            {
               params: { filters: { id: userIds } },
            }
         );
         return results.data.data;
      } catch {
         return null;
      }
   }
}

export default new Service();
