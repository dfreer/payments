import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import pinia from '@/inc/pinia';
import vuetify from '@/inc/vuetify';
import hyphen from '@/inc/hyphen';

Vue.use(hyphen);

Vue.config.productionTip = false;

new Vue({
   pinia,
   router,
   vuetify,
   render: (h) => h(App),
}).$mount('#app');
