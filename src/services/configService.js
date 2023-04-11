import { apiServiceTypes } from '@/inc/api';
import { useSnackbarStore } from '@/stores';
import BaseService from './baseService';
import { useApplicationStore } from '@/stores';

const configUrl = '/config.json';

class Service extends BaseService {
   constructor() {
      super({ apiServiceType: apiServiceTypes.BASE });
   }
   async get() {
      try {
         const data = await this.api.get(configUrl);
         useApplicationStore().setConfig(data);
      } catch {
         useSnackbarStore().error(
            'Error retrieving config json! Please reload the page and try again.'
         );
      }
   }
}

export default new Service();
