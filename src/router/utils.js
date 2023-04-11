const defaultRouteMeta = {
   title: '',
};

export function recursivelyAddMeta(route, meta) {
   const hasMeta = route?.meta ?? false;
   // routes without a name cannot be navigated to
   const hasName = route?.name ?? false;
   if (!hasMeta && hasName) {
      route = { ...route, meta: defaultRouteMeta };
   }

   route.meta = { ...route.meta, ...meta };

   if ('children' in route) {
      route.children = route.children.map((childRoute) =>
         recursivelyAddMeta(childRoute, meta)
      );
   }

   return route;
}

export const globalMiddleware = function ({ to, appStore, currentUserStore }) {
   // console.log('middleware: global');

   if (appStore.inMaintenance === 'true' && to.name !== 'maintenance') {
      currentUserStore.logout();
      return 'maintenance';
   }

   let title = 'Nacha Momma';
   const pageTitle = to?.meta?.title ?? null;
   if (pageTitle) title += ` | ${pageTitle}`;
   document.title = title;
};

export const authenticatedMiddleware = function ({ to, currentUserStore }) {
   // console.log('middleware: authenticated');

   if (!currentUserStore.authenticated) {
      // send to core with redirect?
   }

   // check perms
   const permission = to?.meta?.permission ?? false;
   if (!permission) return;

   if (!currentUserStore.can(permission)) {
      // console.log(
      //    '%cPermission check failed!',
      //    'background: red; color: white; padding: 2px 5px;'
      // );
      return 'dashboard';
   }
};

export const hyphenOnlyMiddleware = function ({ useCurrentUserStore }) {
   if (useCurrentUserStore().user.type === 'hyphen') {
      return;
   }

   return 'dashboard';
};
