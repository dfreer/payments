import BaseService from './baseService';
import { useCurrentUserStore } from '@/stores';
import { apiServiceTypes } from '@/inc/api';

class Service extends BaseService {
   constructor() {
      super({ apiServiceType: apiServiceTypes.AUTH });
   }

   timezones() {
      return this.api.get('timezones');
   }

   getCompany(companyId) {
      return this.api.get(`companies/${companyId}`);
   }

   getUserCompanies() {
      return this.api
         .get(`users/${useCurrentUserStore().user.id}/companies`)
         .then(({ data }) => data);
   }

   getSubscriptions(companyId) {
      return this.api.get(`companies/${companyId}/subscriptions`);
   }
}

export default new Service();
