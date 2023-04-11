<template>
   <VForm
      @submit.prevent="$emit('submit')"
      lazy-validation
      class="fill-height"
      style="padding: 0 !important"
   >
      <div class="pa-4">
         <slot />
      </div>
      <div class="mt-auto">
         <VDivider />
         <VCardActions class="pa-4">
            <slot
               name="actions"
               :loading="loading"
               :color="$colorTheme.accentColor"
               :submitLabel="submitLabel"
            >
               <VSpacer />
               <VBtn
                  class="mr-2"
                  @click="$emit('cancel')"
                  >Cancel</VBtn
               >
               <VBtn
                  dark
                  type="submit"
                  :loading="loading"
                  :color="$colorTheme.accentColor"
               >
                  {{ submitLabel }}
               </VBtn>
            </slot>
         </VCardActions>
      </div>
   </VForm>
</template>

<script>
export default {
   props: {
      submitLabel: { type: String, default: 'Save' },
      loading: { type: Boolean, default: false },
   },
};
</script>
