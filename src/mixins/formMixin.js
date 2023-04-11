export default {
   data() {
      return {
         formMixinFormErrors: null,
      };
   },
   methods: {
      formMixinBindings(field) {
         if (!this.formMixinFormErrors) return null;
         const errorMessages = this.formMixinFormErrors?.[field] ?? [];
         if (errorMessages.length) return { errorMessages };
         return null;
      },
      formMixinClearFormErrors() {
         this.formMixinSetFormErrors();
      },
      formMixinSetFormErrors(errors = null) {
         if (errors instanceof Error) return;
         this.formMixinFormErrors = errors;
      },
   },
};
