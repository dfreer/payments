import CrudService from './crudService';

class Service extends CrudService {
   constructor() {
      super({ url: 'file-submissions', snackbarLabel: 'File Submission' });
   }
}

export default new Service();
