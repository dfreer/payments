import {
   createApi,
   requestConfig,
   responseError,
   apiServiceTypes,
} from '@/inc/api';
import { useSnackbarStore, useApplicationStore } from '@/stores';

export default class {
   api; // changes based on service type

   constructor({ apiServiceType = null } = {}) {
      this.#setApiServiceType(apiServiceType);
      this.#updateResponseInterceptor();
   }

   #getSuccessResponse(data) {
      const { successMessage = null } = data.config;
      if (successMessage) {
         useSnackbarStore().success(successMessage);
      }
      return data.data;
   }

   #getErrorResponse(error) {
      return responseError(error).catch(({ error, status }) => {
         // snackbar will fire automatically in api
         // nothing to do if no status...
         if (!status) return;

         const errorBag = error?.response?.data?.errors ?? null;
         if (status === 422 && errorBag) {
            const { snackbarError = false } = error.config;
            if (snackbarError) {
               useSnackbarStore().error(
                  'Form errors. Please fix and resubmit.'
               );
            }
            return Promise.reject(errorBag);
         }

         return Promise.reject(error);
      });
   }

   #updateResponseInterceptor() {
      this.api.interceptors.response.handlers = [];
      this.api.interceptors.response.use(
         (data) => this.#getSuccessResponse(data),
         (error) => this.#getErrorResponse(error)
      );
   }

   #setApiServiceType(apiServiceType) {
      this.api = createApi();

      if (apiServiceType === apiServiceTypes.BASE) {
         return;
      }

      if (apiServiceType === apiServiceTypes.AUTH) {
         this.api.interceptors.request.use((config) => {
            config = requestConfig(config);
            config.baseURL = useApplicationStore().config.coreApiUrl;
            return config;
         });
         this.api.interceptors.response.use(({ data }) => data, responseError);
         return;
      }

      this.api.interceptors.request.use((config) => {
         config = requestConfig(config);
         config.baseURL = useApplicationStore().config.apiUrl;
         return config;
      });
      this.api.interceptors.response.use((data) => data, responseError);
   }

   convertToFormData(data) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
         formData.set(key, data[key]);
      });
      return formData;
   }
}
