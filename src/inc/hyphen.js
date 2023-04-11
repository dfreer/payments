import '@/scss/styles.scss';
import { useSnackbarStore, useStylesStore, useDrawerStore } from '@/stores';

export default {
   install(Vue) {
      const components = {
         TableBodyTransitionGroup: () =>
            import('@/components/TableBodyTransitionGroup.vue'),
         TheLogo: () => import('@/components/TheLogo.vue'),
         TheLogoSmall: () => import('@/components/TheLogoSmall.vue'),
         TheSnackbar: () => import('@/components/TheSnackbar.vue'),
         DeleteDialogButton: () =>
            import('@/components/DeleteDialogButton.vue'),
         TooltipIconButton: () => import('@/components/TooltipIconButton.vue'),
      };

      Object.keys(components).forEach((key) => {
         Vue.component(key, components[key]);
      });

      Vue.prototype.$colorTheme = useStylesStore().colorTheme;

      const snackbarStore = useSnackbarStore();
      Vue.prototype.$snackbar = {
         success: snackbarStore.success,
         error: snackbarStore.error,
         show: snackbarStore.show,
      };

      const drawerStore = useDrawerStore();
      Vue.prototype.$drawer = {
         show: (config = {}) => {
            drawerStore.show(config);
         },
         close: () => {
            drawerStore.close();
         },
         showSecondary: (config) => {
            drawerStore.showSecondary(config);
         },
         closeSecondary: () => {
            drawerStore.closeSecondary();
         },
      };
   },
};
