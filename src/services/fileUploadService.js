import CrudService from './crudService';

class Service extends CrudService {
   constructor() {
      super({ url: 'uploads', snackbarLabel: 'File' });
   }

   download(item) {
      return this.api.get(`uploads/download/${item.id}`);
   }
}

export default new Service();
