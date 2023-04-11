<template>
   <VNavigationDrawer
      app
      :color="$colorTheme.navBackgroundColor"
      v-model="applicationStore.showSidebar"
      width="220"
   >
      <VListItem
         :color="$colorTheme.navBackgroundColor"
         @click="updateDashboardView('default', 'dashboard')"
         class="pt-2 pb-2"
      >
         <TheLogo
            style="height: 35px; width: auto"
            class="mx-auto"
            :class="logoClass"
         />
      </VListItem>

      <div class="my-3" />

      <VList>
         <template v-for="(item, index) in items">
            <VListGroup
               v-if="item?.children"
               :key="index"
               :value="isOpen(item)"
               :color="$colorTheme.navFontColor"
            >
               <template v-slot:activator>
                  <VListItemIcon class="mr-2">
                     <VIcon>{{ item.icon }}</VIcon>
                  </VListItemIcon>
                  <VListItemContent>
                     <VListItemTitle>{{ item.label }}</VListItemTitle>
                  </VListItemContent>
               </template>
               <VList
                  expand
                  nav
                  dense
                  style="background: #fafafa"
               >
                  <VListItem
                     v-for="(child, childIndex) in item.children"
                     :key="childIndex"
                     :to="child.route"
                     :class="{
                        'VListItem--active': isActive(child.route),
                     }"
                  >
                     <VListItemIcon class="mr-2">
                        <VIcon>{{ child.icon }}</VIcon>
                     </VListItemIcon>
                     <VListItemContent>
                        <VListItemTitle>{{ child.label }}</VListItemTitle>
                     </VListItemContent>
                  </VListItem>
               </VList>
            </VListGroup>
            <VListItem
               v-else
               :key="index"
               :to="item.route"
               :style="{ color: $colorTheme.navFontColor }"
               :class="{
                  link: !isActive(item.route),
               }"
            >
               <VListItemIcon class="mr-2">
                  <VIcon :color="$colorTheme.navFontColor">{{
                     item.icon
                  }}</VIcon>
               </VListItemIcon>
               <VListItemTitle>{{ item.label }}</VListItemTitle>
            </VListItem>
         </template>
      </VList>
      <template
         v-if="user.type === 'hyphen'"
         #append
      >
         <div class="pa-2">
            <v-btn
               v-if="applicationStore.dashboardView === 'default'"
               @click="
                  updateDashboardView('administration', 'ach-file-notice-codes')
               "
               plain
               block
               small
            >
               <v-icon left> mdi-account-cog</v-icon>
               Administration
            </v-btn>
            <v-btn
               v-if="applicationStore.dashboardView === 'administration'"
               @click="updateDashboardView('default', 'dashboard')"
               :color="$colorTheme.navFontColor"
               plain
               block
               small
            >
               <v-icon left> mdi-arrow-left</v-icon>
               Back to dashboard
            </v-btn>
         </div>
      </template>
   </VNavigationDrawer>
</template>

<script>
import { mapStores, mapState } from 'pinia';
import { useApplicationStore, useCurrentUserStore } from '@/stores';

export default {
   computed: {
      ...mapStores(useApplicationStore),
      ...mapState(useCurrentUserStore, ['user']),
      logoClass() {
         return this.applicationStore.dashboardView === 'default'
            ? 'secondary--text'
            : 'white--text';
      },
      items() {
         if (
            this.applicationStore.dashboardView === 'administration' &&
            this.user.type === 'hyphen'
         ) {
            return this.adminItems;
         }

         return this.publicItems;
      },
      publicItems() {
         // TODO - show hide menu items based on perms
         return [
            {
               label: 'Dashboard',
               icon: 'mdi-view-dashboard',
               route: { name: 'dashboard' },
            },
            {
               label: 'File Uploads',
               icon: 'mdi-file',
               route: { name: 'uploads' },
            },
            {
               label: 'SFTP Connections',
               icon: 'mdi-file-arrow-up-down',
               route: { name: 'sftp-connections' },
            },
         ];
      },
      adminItems() {
         return [
            {
               label: 'Notice Codes',
               icon: 'mdi-view-dashboard',
               route: { name: 'ach-file-notice-codes' },
            },
            {
               label: 'Response Codes',
               icon: 'mdi-view-dashboard',
               route: { name: 'ach-file-response-codes' },
            },
         ];
      },
   },
   methods: {
      updateDashboardView(view, route) {
         this.applicationStore.toggleDashboardView(view);
         this.$router.push({ name: route });
      },
      isOpen(item) {
         return !!item?.children?.find((child) => this.isActive(child.route));
      },
      isActive(route) {
         return this.$route.name?.includes(route.name);
      },
   },
};
</script>
<style scoped>
.link {
   text-decoration: none;
   opacity: 70% !important;
   color: inherit;
}

.link:hover {
   opacity: 100% !important;
   color: inherit;
}
</style>
