<template>
   <VTooltip v-bind="position">
      <template #activator="{ on, attrs }">
         <VBtn
            v-bind="{ ...buttonAttrs, ...attrs }"
            v-on="{ ...$listeners, ...on }"
         >
            <slot name="icon">
               <VIcon>{{ $attrs['icon'] }}</VIcon>
            </slot>
         </VBtn>
      </template>
      <span>{{ tooltip }}</span>
   </VTooltip>
</template>
<script>
export default {
   props: {
      tooltip: {
         type: String,
         required: true,
      },
   },
   computed: {
      position() {
         if (Object.hasOwn(this.$attrs, 'top')) {
            return { top: true };
         }
         if (Object.hasOwn(this.$attrs, 'right')) {
            return { right: true };
         }
         if (Object.hasOwn(this.$attrs, 'left')) {
            return { left: true };
         }
         return { bottom: true };
      },
      buttonAttrs() {
         const notAllowed = ['top', 'bottom', 'right', 'left', 'icon'];
         const attrs = Object.keys(this.$attrs)
            .filter((key) => !notAllowed.includes(key))
            .reduce((obj, key) => {
               obj[key] = this.$attrs[key];
               return obj;
            }, {});
         attrs['icon'] = true;
         return attrs;
      },
   },
};
</script>
