<template>
   <v-card elevation="0">
      <v-card-text>
         <v-container fluid>
            <v-row no-gutters>
               <v-col
                  cols="4"
                  md="4"
                  sm="4"
               >
                  <h4>{{ title }}</h4>
                  <p class="mt-4">{{ caption }}</p>
               </v-col>
               <v-col
                  align-self="center"
                  align="center"
                  cols="8"
                  md="8"
                  sm="8"
               >
                  <slot name="inputs"></slot>
               </v-col>
            </v-row>
            <v-flex
               d-flex
               justify-end
               class="mb-6"
            >
               <VBtn
                  color="grey darken-3"
                  class="white--text"
                  :loading="buttonLoading"
                  @click="$emit('submit')"
               >
                  {{ buttonText }}
               </VBtn>
            </v-flex>
         </v-container>
      </v-card-text>
   </v-card>
</template>
<script>
export default {
   props: {
      title: {
         type: String,
         default: () => 'Title here',
      },
      caption: {
         type: String,
         default: () => 'Caption here',
      },
      buttonText: {
         type: String,
         default: () => 'Save',
      },
      buttonLoading: {
         type: Boolean,
         default: () => false,
      },
   },
};
</script>
