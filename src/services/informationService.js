import BaseService from './baseService';

class Service extends BaseService {
   get(url) {
      return this.api.get(url);
   }
}

export default new Service();
