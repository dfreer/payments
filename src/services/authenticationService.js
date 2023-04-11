import { apiServiceTypes } from '@/inc/api';
import { useApplicationStore, useCurrentUserStore } from '@/stores';
import BaseService from './baseService';

class Service extends BaseService {
   constructor() {
      super({ apiServiceType: apiServiceTypes.AUTH });
   }

   async verifyToken() {
      let token = localStorage.getItem('token');
      if (token && token.length <= 4) token = null; // prevent the null as string token

      if (!token) {
         return this.logout();
      }

      const { config } = useApplicationStore();
      try {
         const { data } = await this.api.get(
            `companies/${config.companyId}/applications/${config.applicationId}/authenticate-from-token`
         );
         useCurrentUserStore().init({ user: data, hasVerifiedToken: true });
      } catch {
         return false;
      }
   }

   async logout(tokenIsValid = true, to = null) {
      const token = localStorage.getItem('token') ?? null;
      if (token && token.length > 4 && tokenIsValid) {
         await this.api.post('logout').catch(() => {});
      }

      localStorage.clear();

      useCurrentUserStore().redirect(to);
   }
}

export default new Service();
