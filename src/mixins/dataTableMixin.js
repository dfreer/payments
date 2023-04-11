import { debounce } from 'lodash';

export default {
   data() {
      return {
         dataTableMixin: {
            search: '',
            loading: false,
            options: {
               itemsPerPage: 15,
               page: 1,
            },
            footerProps: {
               showCurrentPage: true,
               showFirstLastPage: true,
               itemsPerPageOptions: [15, 25, 50, 100],
            },
         },
      };
   },
   methods: {
      // Debounce will not work with an arrow function
      // eslint-disable-next-line func-names
      dataTableMixinSearch: debounce(function () {
         this.dataTableMixin.options.page = 1;
         this.updateTable();
      }, 500),
      dataTableMixinFilters(params = {}) {
         return {
            params: {
               ...this.dataTableMixin.options,
               search: this.dataTableMixin.search,
               ...params,
            },
         };
      },
   },
};
