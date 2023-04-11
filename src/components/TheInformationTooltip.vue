<template>
   <VCard :loading="loading">
      <VBtn
         v-if="showClose"
         @click="close"
         class="mx-4 mt-4"
         x-small
         >Close</VBtn
      >
      <div class="pa-4">
         <div
            v-if="information"
            v-html="information"
         />
         <VSkeletonLoader
            v-else
            type="text"
         />
      </div>
   </VCard>
</template>

<script>
import { InformationService } from '@/services';

export default {
   props: {
      endpoint: { type: String, required: true },
      action: { type: String, required: true },
      showClose: { type: Boolean, default: true },
   },
   data: () => {
      return {
         loading: true,
         information: null,
      };
   },
   mounted() {
      this.fetch();
   },
   watch: {
      endpoint() {
         this.fetch();
      },
      action() {
         this.fetch();
      },
   },
   methods: {
      close() {
         if (this.showClose) {
            this.$drawer.closeSecondary();
         } else {
            this.$drawer.close();
         }
      },
      fetch() {
         this.loading = true;
         this.information = null;
         InformationService.get(`${this.endpoint}/information/${this.action}`)
            .then(({ data }) => {
               this.information = data;
            })
            .catch(() => {
               this.$snackbar.error(
                  'We are sorry, but we could not load that information at this time.'
               );
            })
            .finally(() => {
               this.loading = false;
            });
      },
   },
};
</script>
