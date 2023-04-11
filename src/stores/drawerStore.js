import { defineStore } from 'pinia';

const primaryConfig = {
   show: false,
   width: 420,
   component: null,
   props: null,
   events: null,
   title: null,
   showCard: true,
};

const secondaryConfig = {
   width: 420,
   component: null,
   props: null,
   events: null,
};

export default defineStore('drawer', {
   state: () => ({
      primary: { ...primaryConfig },
      secondary: { ...secondaryConfig },
   }),
   getters: {
      totalWidth: (state) => {
         // warn: prob need error handling here...
         const primaryWidth = state.primary.component
            ? parseInt(state.primary.width)
            : 0;
         const secondaryWidth = state.secondary.component
            ? parseInt(state.secondary.width)
            : 0;
         return parseInt(primaryWidth + secondaryWidth);
      },
   },
   actions: {
      updateHtmlTag() {
         document.querySelector('html').classList.toggle('nooverflow');
      },
      show(config) {
         this.updateHtmlTag();
         this.$patch({ primary: { ...config, show: true } });
      },
      showSecondary(config) {
         if (!this.primary.component) {
            throw Error(
               'No primary component is set. Please set a primary component before setting a secondary.'
            );
         }
         this.$patch({ secondary: config });
      },
      close() {
         // will be reset when animation is complete
         // via TheDrawer.vue component
         this.$patch({ primary: { show: false } });
      },
      closeSecondary() {
         this.$patch({ secondary: { ...secondaryConfig } });
      },
      reset() {
         this.$reset();
         this.updateHtmlTag();
      },
   },
});
