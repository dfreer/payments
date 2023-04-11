import { until } from '@/inc/utils';
import { defineStore } from 'pinia';
import { useSnackbarStore, useApplicationStore } from '@/stores';

export default defineStore('currentUser', {
   state: () => ({
      user: {},
      hasVerifiedToken: false,
   }),
   getters: {
      snackbarStore() {
         return useSnackbarStore();
      },
      authenticated() {
         return !!Object.keys(this.user).length;
      },
      isHyphenUser() {
         return !!(this?.user?.type === 'hyphen' ?? false);
      },
   },
   actions: {
      async waitForToken() {
         const check = () => this.hasVerifiedToken;
         await until(check, 100);
      },
      setUser(value = {}) {
         this.user = value;
      },
      init({ user, hasVerifiedToken }) {
         this.setUser(user);
         this.hasVerifiedToken = hasVerifiedToken;
      },
      redirect(to = null) {
         window.location.href =
            to ?? `${useApplicationStore().config.coreUrl}auth/login`;
      },
   },
});
