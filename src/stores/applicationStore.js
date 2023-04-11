import { defineStore } from 'pinia';
import { useStylesStore } from '@/stores';
import { useCurrentUserStore } from '.';

export default defineStore('application', {
   state: () => ({
      showSidebar: true,
      dashboardView: 'default',
      config: {},
   }),
   getters: {
      initialized() {
         return this.hasConfig && useCurrentUserStore().authenticated;
      },
      hasConfig: (state) => {
         return !!Object.keys(state.config).length;
      },
   },
   actions: {
      async toggleDashboardView(view) {
         this.dashboardView = view;
         useStylesStore().toggleColorTheme(view);
      },
      toggleSidebar() {
         this.showSidebar = !this.showSidebar;
      },
      setConfig(config) {
         this.config = config;
      },
   },
});
