<template>
   <VBtn
      x-small
      icon
      color="blue"
      outlined
      @click="toggleInformationDrawer"
   >
      <VIcon>mdi-help</VIcon>
   </VBtn>
</template>

<script>
import { mapState } from 'pinia';
import { useDrawerStore } from '@/stores';

export default {
   props: {
      endpoint: {
         type: String,
         default: '',
      },
      action: {
         type: String,
         default: 'default',
      },
   },
   computed: {
      ...mapState(useDrawerStore, ['primary', 'secondary']),
   },
   methods: {
      async toggleInformationDrawer() {
         const method = this.primary?.component ? 'showSecondary' : 'show';
         this.$drawer[method]({
            props: {
               endpoint: this.endpoint,
               action: this.action,
               showClose: method === 'showSecondary',
            },
            component: () => import('@/components/TheInformationTooltip.vue'),
         });
      },
   },
};
</script>
