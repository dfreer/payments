<template>
   <VNavigationDrawer
      v-model="drawerStore.primary.show"
      right
      fixed
      temporary
      floating
      @transitionend="onTransitionEnd"
      :width="drawerStore.totalWidth"
      :color="$colorTheme.drawerBgColor"
   >
      <VBtn
         class="mt-4 ml-4 mb-4"
         :color="$colorTheme.accentColor"
         dark
         @click="drawerStore.close"
      >
         X
      </VBtn>
      <VRow>
         <VCol
            v-if="drawerStore.primary.component"
            class="fill-height"
         >
            <VCard
               :class="[
                  'd-flex flex-column',
                  drawerStore.primary.showCard && 'mr-4 ml-4',
               ]"
               :flat="!drawerStore.primary.showCard"
               :style="{
                  height: 'calc(100% - 20px)',
                  backgroundColor: drawerStore.primary.showCard
                     ? $colorTheme.drawerCardBgColor
                     : 'transparent',
                  color: $colorTheme.drawerColor,
               }"
            >
               <div v-if="drawerStore.primary.title">
                  <VCardTitle class="text-h5 pt-3 pb-2">
                     {{ drawerStore.primary.title }}
                  </VCardTitle>
                  <VDivider />
               </div>
               <Component
                  class="pa-4"
                  v-bind="drawerStore.primary.props ?? null"
                  v-on="drawerStore.primary.events ?? null"
                  :is="drawerStore.primary.component"
               />
            </VCard>
         </VCol>
         <VCol v-if="drawerStore.secondary.component">
            <Component
               v-bind="drawerStore.secondary.props ?? null"
               v-on="drawerStore.secondary.events ?? null"
               :is="drawerStore.secondary.component"
            />
         </VCol>
      </VRow>
   </VNavigationDrawer>
</template>

<script>
import { mapStores } from 'pinia';
import { useDrawerStore } from '@/stores';

export default {
   computed: {
      ...mapStores(useDrawerStore),
      drawerWidth() {
         let width = 0;
         if (this.drawerStore.primary.component) {
            width += parseInt(this.drawerStore.primary.width, 10);
         }
         if (this.drawerStore.secondary) {
            width += parseInt(this.drawerStore.secondary.width, 10);
         }
         return width + 12 + 'px';
      },
   },
   methods: {
      onTransitionEnd(e) {
         if (
            e.propertyName === 'visibility' &&
            !this.drawerStore.primary.show
         ) {
            this.drawerStore.reset();
         }
      },
   },
};
</script>
