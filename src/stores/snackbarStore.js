import { defineStore } from 'pinia';

export default defineStore('snackbar', {
   state: () => ({
      snackbars: [],
   }),
   actions: {
      success(message, config = {}) {
         this.show({
            message,
            ...config,
         });
      },
      error(message, config = {}) {
         this.show({
            message,
            color: 'red',
            ...config,
         });
      },
      show(config) {
         const snack = {
            title: null,
            message: null,
            show: false,
            timeout: 3000,
            color: 'success',
            delay: null,
            transition: 'slide-x-reverse-transition',
            // i know... this might conflict
            id: Math.floor(Math.random() * Date.now()),
            ...config,
         };
         this.snackbars.push(snack);
         // this is so it will animate in
         setTimeout(() => {
            snack.show = true;
         }, snack.delay ?? 1);
      },
      destroy(snackbarId) {
         // give it time to animate out...
         setTimeout(() => {
            const index = this.snackbars.findIndex((s) => s.id === snackbarId);
            if (index >= 0) this.snackbars.splice(index, 1);
         }, 2000);
      },
   },
});
