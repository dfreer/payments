<template>
   <svg
      width="100%"
      height="100%"
      viewBox="0 0 1083 1083"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xml:space="preserve"
   >
      <rect
         style="fill: currentColor"
         x="0"
         y="879"
         width="1083"
         height="166"
      />
      <rect
         style="fill: currentColor"
         x="0"
         y="0"
         width="1083"
         height="166"
      />
      <rect
         :style="`fill: ${accent}`"
         x="161"
         y="444"
         width="763"
         height="157"
      />
   </svg>
</template>

<script>
export default {
   props: {
      accent: {
         type: String,
         default: '#0095CB',
      },
   },
};
</script>
