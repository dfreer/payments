<template>
   <VCard dark>
      <BaseDrawerForm
         @submit="submitForm"
         @cancel="$emit('cancel')"
         :loading="loading"
         submitLabel="Update"
      >
         <VTextField
            v-model="form.description"
            v-bind="localFormBindings('description')"
            label="Description"
         />
         <VTextField
            v-model="form.hyphen_cost"
            v-bind="localFormBindings('hyphen_cost')"
            label="Hyphen Cost"
         />
         <VTextField
            v-model="form.client_charge"
            v-bind="localFormBindings('client_charge')"
            label="Client Charge"
         />
      </BaseDrawerForm>
   </VCard>
</template>

<script>
import { ACHFileResponseCodeService } from '@/services';
import formMixin from '@/mixins/formMixin';

export default {
   mixins: [formMixin],
   props: {
      achFileResponseCode: {
         type: Object,
      },
   },
   components: {
      BaseDrawerForm: () => import('@/components/BaseDrawerForm.vue'),
   },
   data() {
      return {
         loading: false,
         form: { ...this.achFileResponseCode },
      };
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
         let method = 'update';

         this.update()
            .then(() => {
               this.$emit(method);
            })
            .catch(this.formMixinSetFormErrors)
            .finally(() => {
               this.loading = false;
            });
      },
      update() {
         return ACHFileResponseCodeService.update(
            this.achFileResponseCode.response_code,
            this.form
         );
      },
   },
};
</script>
