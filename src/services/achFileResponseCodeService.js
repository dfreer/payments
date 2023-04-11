import CrudService from './crudService';

class Service extends CrudService {
   constructor() {
      super({
         url: 'ach-file-response-codes',
         snackbarLabel: 'Response Code',
      });
   }
}

export default new Service();
