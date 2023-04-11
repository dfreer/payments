<template>
   <transition-group
      tag="tbody"
      name="tbody"
   >
      <slot />
   </transition-group>
</template>

<script>
import Sortable from 'sortablejs';

export default {
   props: {
      isSortable: {
         type: Boolean,
         default: () => {
            return false;
         },
      },
      filterClass: {
         type: String,
         default: () => {
            return 'is-inactive';
         },
      },
   },
   data: () => ({
      sortable: {},
   }),
   mounted() {
      let table = document.querySelector('.v-data-table tbody');

      this.sortable = Sortable.create(table, {
         filter: this.filterClass,
         disabled: !this.isSortable,
         draggable: `.v-data-table tbody > tr:not(.${this.filterClass})`,
         preventOnFilter: true,
         onEnd: ({ newIndex, oldIndex }) => {
            this.handleOrderUpdate(newIndex, oldIndex);
         },
      });
   },
   methods: {
      handleOrderUpdate(newIndex, oldIndex) {
         if (newIndex !== oldIndex) {
            this.$emit('sort-end', { newIndex, oldIndex });
         }
      },
   },
   unmounted() {
      this.sortable.destroy();
   },
};
</script>

<style>
.tbody-enter-active {
   animation: bounce 0.5s;
}
.tbody-leave-active {
   animation: bounce 0.5s reverse;
}
@keyframes bounce {
   0% {
      transform: scale(0);
   }
   50% {
      transform: scale(1.1);
   }
   100% {
      transform: scale(1);
   }
}
</style>
