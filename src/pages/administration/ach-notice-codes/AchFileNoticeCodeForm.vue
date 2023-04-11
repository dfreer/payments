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
      </BaseDrawerForm>
   </VCard>
</template>
<script>
import { AchFileNoticeCodeService } from '@/services';
import formMixin from '@/mixins/formMixin';
export default {
   mixins: [formMixin],
   props: {
      achFileNoticeCode: {
         type: Object,
      },
   },
   components: {
      BaseDrawerForm: () => import('@/components/BaseDrawerForm.vue'),
   },
   data() {
      return {
         loading: false,
         form: { ...this.achFileNoticeCode },
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
         return AchFileNoticeCodeService.update(
            this.achFileNoticeCode.notice_code,
            this.form
         );
      },
   },
};
</script>
