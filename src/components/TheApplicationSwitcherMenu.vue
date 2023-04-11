<template>
   <div>
      <VMenu
         bottom
         left
         min-width="400px"
         max-width="400px"
         rounded
         offset-y
         :closeOnContentClick="false"
      >
         <template #activator="{ on }">
            <VBtn
               icon
               x-large
               v-on="on"
               :style="{ color: $colorTheme.titleBarFontColor }"
            >
               <VIcon>mdi-dots-grid</VIcon>
            </VBtn>
         </template>
         <div
            :style="{
               backgroundColor: $colorTheme.applicationMenuBackgroundColor,
            }"
            class="pa-6"
         >
            <TheApplicationSwitcher />
         </div>
      </VMenu>
   </div>
</template>

<script>
export default {
   components: {
      TheApplicationSwitcher: () =>
         import('@/components/TheApplicationSwitcher.vue'),
   },
};
</script>
