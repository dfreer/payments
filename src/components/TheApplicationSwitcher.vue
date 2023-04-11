<template>
   <div>
      <div class="d-flex justify-space-between align-center mb-8">
         <h3 :style="{ color: $colorTheme.titleBarFontColor }">Switch to</h3>
         <VBtn
            x-small
            :href="config.coreUrl"
            :style="{
               backgroundColor: $colorTheme.applicationMenuItemBackgroundColor,
               color: $colorTheme.titleBarFontColor,
            }"
         >
            <span class="pr-2">App Core</span>
            <VIcon x-small>mdi-open-in-new</VIcon>
         </VBtn>
      </div>

      <VSelect
         v-if="companies && companies.length"
         label="Company"
         v-model="companyId"
         :items="companies"
         itemText="legal_name"
         itemValue="id"
         @change="getSubscriptions"
         outlined
         :dark="true"
      />
      <template v-else>
         <p v-if="company">
            {{ company.legal_name }}
         </p>
      </template>

      <div
         class="d-flex flex-wrap mx-auto"
         style="gap: 1em"
      >
         <template v-if="subscriptions">
            <template v-if="subscriptions.length">
               <VHover
                  v-slot="{ hover }"
                  v-for="subscription in subscriptions"
                  :key="subscription.id"
               >
                  <component
                     :is="subscription.deleted_at ? 'div' : 'a'"
                     class="d-inine-block"
                     :style="{
                        textDecoration: 'none',
                        color: isActive(subscription)
                           ? $colorTheme.accentColor
                           : null,
                     }"
                     :href="subscription.application.ui_url"
                  >
                     <VCard
                        width="105"
                        height="105"
                        :flat="!hover && !isActive(subscription)"
                        :class="[
                           'd-flex justify-center align-center text-center',
                        ]"
                        :style="{
                           color:
                              hover || isActive(subscription)
                                 ? $colorTheme.accentColor
                                 : $colorTheme.titleBarFontColor,
                           backgroundColor:
                              $colorTheme.applicationMenuItemBackgroundColor,
                        }"
                     >
                        <div class="">
                           <VIcon
                              style="font-size: 60px; color: inherit !important"
                           >
                              {{ subscription.application.mdi_icon }}
                           </VIcon>
                           <p class="subtitle-1 ma-0 pa-0">
                              {{ subscription.application.name }}
                           </p>
                        </div>
                     </VCard>
                  </component>
               </VHover>
            </template>
            <div
               v-else
               class="text-center pa-12"
            >
               No subscriptions found.
            </div>
         </template>
         <template v-else>
            <VSkeletonLoader
               style="width: 60px; height: 60px"
               type="image"
               v-for="n in 8"
               :key="n"
            />
         </template>
      </div>
   </div>
</template>

<script>
import { useApplicationStore } from '@/stores';
import { CoreService } from '@/services';
export default {
   data() {
      return {
         companyId: null,
         company: null,
         companies: null,
         subscriptions: null,
      };
   },
   mounted() {
      // we should have the current company id
      this.companyId = this.config.companyId;
      this.getCompany();
      this.getUserCompanies();
      this.getSubscriptions();
   },
   computed: {
      config() {
         return useApplicationStore().config;
      },
   },
   methods: {
      isActive(subscription) {
         return this.config.applicationId === subscription.application.id;
      },
      getCompany() {
         CoreService.getCompany(this.companyId).then(({ data }) => {
            this.company = data;
         });
      },
      getUserCompanies() {
         this.companies = null;
         CoreService.getUserCompanies()
            .then(({ data }) => {
               this.companies = data;
            })
            .catch(() => {});
      },
      getSubscriptions() {
         this.subscriptions = null;
         CoreService.getSubscriptions(this.companyId)
            .then(({ data }) => {
               this.subscriptions = data;
            })
            .catch(() => {});
      },
   },
};
</script>
