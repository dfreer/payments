<template>
   <VApp :style="{ backgroundColor: $colorTheme.pageBackgroundColor }">
      <iframe
         :src="config.coreIframeUrl"
         width="0"
         height="0"
         tabindex="-1"
         class="d-none"
      />
      <RouterView>
         <VContainer fill-height>
            <VLayout
               row
               justify-center
               align-center
            >
               <VProgressCircular
                  :size="70"
                  :width="7"
                  indeterminate
                  color="#2b3243"
               />
            </VLayout>
         </VContainer>
      </RouterView>
      <TheSnackbar />
   </VApp>
</template>

<script>
import { mapState } from 'pinia';
import { useApplicationStore } from '@/stores';
import { AuthenticationService } from '@/services';
export default {
   data() {
      return {
         ival: null,
      };
   },
   computed: {
      ...mapState(useApplicationStore, ['config']),
   },
   mounted() {
      window.addEventListener('message', this.onIframeEvent);
      this.ival = setTimeout(() => {
         console.log(
            'what to do if we dont get a token within the allotted time???'
         );
      }, 5000);
   },
   beforeDestroy() {
      this.removeListener();
   },
   methods: {
      removeListener() {
         window.removeEventListener('message', this.onIframeEvent);
      },
      async onIframeEvent(event) {
         if (event.data.message === 'here is your token!') {
            clearTimeout(this.ival);
            localStorage.setItem('token', event.data.token);
            this.removeListener();
            AuthenticationService.verifyToken();
         }
      },
   },
};
</script>
