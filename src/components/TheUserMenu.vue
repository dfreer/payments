<template>
   <div>
      <VMenu
         bottom
         left
         min-width="200px"
         rounded
         offset-y
      >
         <template #activator="{ on }">
            <VBtn
               icon
               x-large
               v-on="on"
            >
               <VAvatar
                  :color="$colorTheme.accentColor"
                  size="40"
               >
                  <span :style="{ color: $colorTheme.accentFontColor }">
                     {{ initials }}
                  </span>
               </VAvatar>
            </VBtn>
         </template>
         <VCard if="user">
            <VListItemContent class="justify-center">
               <div class="mx-auto text-center">
                  <h3>{{ user.full_name }}</h3>
                  <p class="mt-1 caption">
                     {{ user.email }}
                  </p>
                  <VDivider class="my-3" />
                  <VBtn
                     @click="logout"
                     depressed
                     rounded
                     text
                     >Logout</VBtn
                  >
               </div>
            </VListItemContent>
         </VCard>
      </VMenu>
   </div>
</template>

<script>
import { mapState } from 'pinia';
import { useCurrentUserStore } from '@/stores';
import { AuthenticationService } from '@/services';
export default {
   computed: {
      ...mapState(useCurrentUserStore, ['user']),
      initials() {
         if (this.user?.first && this.user?.last) {
            return `${this.user.first[0]}${this.user.last[0]}`;
         }
         return '';
      },
   },
   methods: {
      logout() {
         AuthenticationService.logout();
      },
   },
};
</script>
