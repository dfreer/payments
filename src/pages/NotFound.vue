<template>
   <VContainer
      fill-height
      fluid
   >
      <VRow
         align="center"
         justify="center"
         class="lighten-5"
      >
         <VCard
            height="400"
            color="transparent"
            flat
         >
            <div class="display-3 mt-5">Page not found.</div>
            <div class="grey--text lighten-5 mt-5">
               The page you are trying access never existed in this reality, or
               has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-5 pt-5">
               Try going back to <router-link to="/"> home </router-link> Or,
               contact helpdesk for support.
            </div>
         </VCard>
      </VRow>
   </VContainer>
</template>
