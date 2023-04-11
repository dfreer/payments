<template>
   <div class="v-snackbar-wrapper">
      <VSnackbar
         top
         right
         v-model="snackbar.show"
         :color="snackbar.color"
         :key="snackbar.id"
         :timeout="snackbar.timeout"
         :transition="snackbar.transition"
         @input="destroy(snackbar.id)"
         v-for="snackbar in snackbars"
      >
         <template v-slot:default>
            <h3 v-if="snackbar.title">{{ snackbar.title }}</h3>
            <slot :message="snackbar.message">
               <div v-if="typeof snackbar.message === 'string'">
                  {{ snackbar.message }}
               </div>
               <div v-if="Array.isArray(snackbar.message)">
                  <ul>
                     <li
                        v-for="(message, index) in snackbar.message"
                        :key="index"
                     >
                        {{ message }}
                     </li>
                  </ul>
               </div>
            </slot>
         </template>
      </VSnackbar>
   </div>
</template>

<script>
import { useSnackbarStore } from '@/stores';
import { mapState, mapActions } from 'pinia';
export default {
   computed: {
      ...mapState(useSnackbarStore, ['snackbars']),
   },
   methods: {
      ...mapActions(useSnackbarStore, ['destroy']),
   },
};
</script>
