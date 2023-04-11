import CrudService from './crudService.js';

class Service extends CrudService {
   constructor() {
      super({ url: 'sftp-sites', snackbarLabel: 'SFTP connection' });
   }
}

export default new Service();
