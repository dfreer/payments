export default {
   path: '/',
   component: () => import('@/layouts/DefaultLayout.vue'),
   children: [
      {
         path: '',
         redirect: 'dashboard',
      },
      {
         path: 'dashboard',
         component: () => import('@/pages/DashboardPage.vue'),
         name: 'dashboard',
         meta: {
            title: 'Dashboard',
         },
      },
      {
         path: '/sftp/uploads',
         component: () => import('@/pages/file-uploads/FileUploads.vue'),
         name: 'uploads',
         meta: {
            title: 'Uploads',
         },
      },
      {
         path: '/sftp-connections',
         component: () =>
            import('@/pages/sftp-connections/SFTPConnections.vue'),
         name: 'sftp-connections',
         meta: {
            title: 'SFTP Connections',
         },
      },
   ],
};
