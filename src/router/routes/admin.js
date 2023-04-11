export default {
   path: '/administration',
   component: () => import('@/layouts/DefaultLayout.vue'),
   children: [
      {
         path: '/ach-file-response-codes',
         component: () =>
            import(
               '@/pages/administration/ach-file-response-codes/ACHFileResponseCodes.vue'
            ),
         name: 'ach-file-response-codes',
         meta: {
            title: 'ACH File Response Codes',
         },
      },
      {
         path: '/ach-file-notice-codes',
         component: () =>
            import(
               '@/pages/administration/ach-notice-codes/AchFileNoticeCodes.vue'
            ),
         name: 'ach-file-notice-codes',
         meta: {
            title: 'ACH File Notice Codes',
         },
      },
   ],
};
