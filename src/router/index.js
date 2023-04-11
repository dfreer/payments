import Vue from 'vue';
import VueRouter from 'vue-router';

import {
   useApplicationStore,
   useCurrentUserStore,
   useAppStore,
} from '@/stores';
import { ConfigService, AuthenticationService } from '@/services';

import { recursivelyAddMeta, hyphenOnlyMiddleware } from './utils';

import { default as publicRoutes } from './routes/public';
import { default as adminRoutes } from './routes/admin';

Vue.use(VueRouter);

const router = new VueRouter({
   mode: 'history',
   routes: [
      recursivelyAddMeta(publicRoutes, {
         view: 'default',
      }),
      recursivelyAddMeta(adminRoutes, {
         view: 'administration',
         middleware: hyphenOnlyMiddleware,
      }),
      {
         path: '/maintenance',
         component: () => import('@/pages/MaintenancePage.vue'),
         name: 'maintenance',
         meta: {
            view: 'default',
            title: 'Maintenance',
         },
      },
      {
         path: '*',
         component: () => import('@/pages/NotFound.vue'),
         name: 'not-found',
         meta: {
            view: 'default',
            title: '404 Error - Page not found',
         },
      },
   ],
});
router.beforeEach(async (to, from, next) => {
   if (!useApplicationStore().initialized) {
      await ConfigService.get();
      await useCurrentUserStore().waitForToken();
   }

   document.title = `Nacha Momma | ${to.meta.title || ''}`;

   let routeMiddleware = to?.meta?.middleware ?? [];

   if (typeof routeMiddleware === 'function') {
      routeMiddleware = [routeMiddleware];
   }

   routeMiddleware = [...routeMiddleware];

   let routeName = null;
   for (let i = 0; i < routeMiddleware.length; i++) {
      routeName = routeMiddleware[i]({
         from,
         to,
         useCurrentUserStore,
         useAppStore,
      });

      if (typeof routeName === 'string') break;
   }

   if (routeName && routeName !== to.name) {
      return next({ name: routeName });
   }

   next();
});

router.afterEach(async (to) => {
   const view = to?.meta?.view ?? null;
   if (view) {
      await useApplicationStore().toggleDashboardView(view);
   }

   if (!window.localStorage.getItem('token')) {
      await AuthenticationService.logout(false);
   }
});

export default router;
