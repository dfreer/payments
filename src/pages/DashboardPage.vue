<template>
   <h1>Hello {{ user.first }}!</h1>
</template>

<script>
import { useCurrentUserStore } from '@/stores';
export default {
   computed: {
      user() {
         return useCurrentUserStore().user;
      },
   },
};
</script>
