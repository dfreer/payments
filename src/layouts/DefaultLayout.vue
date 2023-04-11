<template>
   <div>
      <TheSidebar />
      <TheHeader />
      <VMain>
         <VContainer
            fluid
            class="pa-8"
         >
            <RouterView />
         </VContainer>
      </VMain>
      <TheDrawer />
   </div>
</template>

<script>
export default {
   components: {
      RouterView: () => import('@/layouts/RouterView.vue'),
      TheHeader: () => import('@/components/TheHeader.vue'),
      TheDrawer: () => import('@/components/TheDrawer.vue'),
      TheSidebar: () => import('@/components/TheSidebar.vue'),
   },
   computed: {
      pageTitle() {
         return this.$route?.meta?.title ?? 'Page';
      },
   },
};
</script>
