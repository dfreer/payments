<template>
   <VForm
      @submit.prevent="submit"
      :disabled="busy"
   >
      <VTextField
         label="File Id"
         :value="file_id"
         disabled
         outlined
         dense
      />
      <VAutocomplete
         :items="sites"
         v-model="site_id"
         outlined
         label="Select SFTP site to send File"
         chips
         small-chips
         deletable-chips
         item-text="name"
         item-value="id"
         v-bind="formMixinBindings('site_id')"
      />

      <VBtn
         dark
         :color="$colorTheme.accentColor"
         >Submit</VBtn
      >
   </VForm>
</template>

<script>
import { FileSubmissionService, SftpConnectionsService } from '@/services';
import formMixin from '@/mixins/formMixin';

export default {
   props: {
      file_id: {
         required: true,
         type: String,
      },
   },
   data() {
      return {
         busy: false,
         sites: [],
         site_id: '',
      };
   },
   async created() {
      this.sites = (await SftpConnectionsService.index()).data.data;
   },
   mixins: [formMixin],
   methods: {
      submit() {
         this.busy = true;
         FileSubmissionService.store({
            file_id: this.file_id,
            site_id: this.site_id,
         })
            .then(() => {
               this.$emit('fileSubmitted', true);
            })
            .catch((errors) => {
               this.formMixinSetFormErrors(errors);
               this.$emit('fileSubmitted');
            })
            .finally(() => {
               this.busy = false;
            });
      },
   },
};
</script>
