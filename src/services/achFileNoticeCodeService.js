import CrudService from './crudService';
class Service extends CrudService {
   constructor() {
      super({
         url: 'ach-file-notice-codes',
         snackbarLabel: 'Notice Code',
      });
   }
}
export default new Service();
