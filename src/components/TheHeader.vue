<template>
   <VAppBar
      :color="$colorTheme.titleBarColor"
      :style="{
         color: $colorTheme.titleBarFontColor,
         paddingLeft: '1em',
         paddingRight: '1em',
      }"
      app
      flat
   >
      <VAppBarNavIcon
         @click="applicationStore.toggleSidebar"
         :style="{ color: $colorTheme.titleBarFontColor }"
      />
      <VToolbarTitle>{{ $route.meta.title }}</VToolbarTitle>
      <VSpacer />
      <h3
         :style="{ color: $colorTheme.titleBarFontColor }"
         class="mr-4"
      >
         Payments
      </h3>
      <TheApplicationSwitcherMenu class="mr-4" />
      <TheUserMenu />
   </VAppBar>
</template>

<script>
import { mapStores } from 'pinia';
import { useApplicationStore } from '@/stores';

export default {
   components: {
      TheApplicationSwitcherMenu: () =>
         import('@/components/TheApplicationSwitcherMenu.vue'),
      TheUserMenu: () => import('@/components/TheUserMenu.vue'),
   },
   computed: {
      ...mapStores(useApplicationStore),
   },
};
</script>
