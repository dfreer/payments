<template>
   <BaseDrawerForm
      @submit="submitForm"
      @cancel="$emit('cancel')"
      :loading="loading"
      :submitLabel="editing ? 'Update' : 'Save'"
   >
      <p :class="subtitleBindings">Connection Settings</p>
      <VTextField
         v-model="form.name"
         v-bind="localFormBindings('name')"
         label="Name"
      />
      <VTextField
         v-model="form.host"
         v-bind="localFormBindings('host')"
         label="Host"
      />
      <VTextField
         v-model="form.username"
         v-bind="localFormBindings('username')"
         label="Username"
      />
      <VTextField
         type="password"
         v-model="form.password"
         v-bind="localFormBindings('password')"
         label="Password"
      />
      <VTextField
         v-model="form.port"
         v-bind="localFormBindings('port')"
         label="Port"
      />

      <p :class="subtitleBindings">Upload Settings</p>
      <VTextField
         v-model="form.remote_upload_dir"
         v-bind="localFormBindings('remote_upload_dir')"
         label="Directory"
      />
      <VTextField
         v-model="form.upload_timeout"
         v-bind="localFormBindings('upload_timeout')"
         label="Timeout"
      />

      <p :class="subtitleBindings">Download Settings</p>
      <VTextField
         v-model="form.remote_download_dir"
         v-bind="localFormBindings('remote_download_dir')"
         label="Directory"
      />
      <VTextField
         v-model="form.download_timeout"
         v-bind="localFormBindings('download_timeout')"
         label="Timeout"
      />
      <VTextField
         v-model="form.return_file_name_pattern"
         v-bind="localFormBindings('return_file_name_pattern')"
         label="Return File Name Pattern"
      />

      <p :class="subtitleBindings">Bank Settings</p>
      <VTextField
         v-model="form.bank_aba"
         v-bind="localFormBindings('bank_aba')"
         label="Bank ABA Routing Number"
      />
      <VSelect
         :items="timezoneOptions"
         itemText="display"
         itemValue="display"
         v-model="form.bank_file_timezone"
         v-bind="localFormBindings('bank_file_timezone')"
         label="Timezone of Bank"
      />
      <VTextField
         v-model="form.bank_file_date_format"
         v-bind="localFormBindings('bank_file_date_format')"
         label="Date Format"
      />
   </BaseDrawerForm>
</template>

<script>
import { SftpConnectionsService, CoreService } from '@/services';
import formMixin from '@/mixins/formMixin';

const defaultForm = {
   name: null,
   host: null,
   username: null,
   password: null,
   port: 22,
   remote_upload_dir: '/',
   upload_timeout: 30,
   remote_download_dir: '/',
   download_timeout: 30,
   return_file_name_pattern: '/NAME.*${DATE}.*\\.ach/i',
   bank_aba: null,
   bank_file_timezone: null,
   bank_file_date_format: 'Ymd',
};

export default {
   mixins: [formMixin],
   props: {
      sftpConnection: {
         type: Object,
         default: () => {},
      },
   },
   components: {
      BaseDrawerForm: () => import('@/components/BaseDrawerForm.vue'),
   },
   data() {
      return {
         editing: false,
         loading: false,
         form: { ...defaultForm },
         timezoneOptions: null,
         subtitleBindings: {
            class: 'text-subtitle-1 px-0',
         },
      };
   },
   async created() {
      await CoreService.timezones()
         .then(({ data }) => {
            this.timezoneOptions = data;
         })
         .catch(() => {});

      if (this.sftpConnection) {
         this.editing = true;
         this.form = {
            password: null,
            ...this.sftpConnection,
         };
      }
   },
   methods: {
      localFormBindings(field) {
         return {
            ...this.formMixinBindings(field),
            dense: true,
            outlined: true,
            clearable: true,
         };
      },
      submitForm() {
         this.loading = true;
         this.formMixinClearFormErrors();
         let method = this.editing ? 'update' : 'create';

         this[method]()
            .then(() => {
               if (method === 'create') {
                  this.form = { ...defaultForm };
               }
               this.$emit(method);
            })
            .catch(this.formMixinSetFormErrors)
            .finally(() => {
               this.loading = false;
            });
      },
      create() {
         return SftpConnectionsService.store(this.form);
      },
      update() {
         return SftpConnectionsService.update(
            this.sftpConnection.id,
            this.form
         );
      },
   },
};
</script>
