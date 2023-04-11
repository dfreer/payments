<template>
   <BaseDrawerForm
      :loading="loading"
      @submit="submit"
      @cancel="$emit('cancel')"
   >
      <VFileInput
         v-model="file"
         v-bind="formMixinBindings('file')"
         dense
         outlined
         label="File"
         accept=".ach"
         hide-details="auto"
         class="mb-4"
         @change="formMixinClearFormErrors"
      />
      <VCheckbox
         v-model="validate"
         hide-details
         :true-value="1"
         :false-value="0"
         label="Validate file"
         :class="{ 'mb-4': validate }"
         @change="validationType = validate ? validationType : ''"
      />
      <VSelect
         v-if="validate"
         v-model="validationType"
         v-bind="formMixinBindings('validation_type')"
         dense
         outlined
         clearable
         hide-details="auto"
         label="Validation type"
         :items="validationOptions"
         @change="formMixinClearFormErrors"
      />
   </BaseDrawerForm>
</template>

<script>
import formMixin from '@/mixins/formMixin.js';
import { FileUploadService } from '@/services';

export default {
   components: {
      BaseDrawerForm: () => import('@/components/BaseDrawerForm.vue'),
   },
   mixins: [formMixin],
   data() {
      return {
         file: null,
         loading: false,
         validate: false,
         validationType: '',
         validationOptions: ['ach'],
      };
   },
   methods: {
      async submit() {
         this.loading = true;

         const payload = { file: this.file };

         if (this.validate) {
            payload.validate = this.validate;
            payload.validation_type = this.validationType;
         }

         await FileUploadService.store(payload, {}, true)
            .then(() => this.$emit('submit'))
            .catch((errors) => this.formMixinSetFormErrors(errors));

         this.loading = false;
      },
   },
};
</script>
