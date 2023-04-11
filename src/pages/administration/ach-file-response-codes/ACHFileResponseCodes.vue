<template>
   <VDataTable
      flat
      dark
      :items="responseCodes.data"
      :headers="headers"
      :loading="dataTableMixin.loading"
      :options.sync="dataTableMixin.options"
      :footer-props.sync="dataTableMixin.footerProps"
      :server-items-length="responseCodes.total"
      item-key="id"
      class="elevation-1 table-footer expanded-with-alert"
      @update:options="updateTable"
   >
      <template #top>
         <VCardTitle>
            <VToolbar
               flat
               class="d-flex justify-end"
            >
               <VTextField
                  v-model="dataTableMixin.search"
                  single-line
                  hide-details
                  label="Search"
                  append-icon="mdi-magnify"
                  @input="dataTableMixinSearch"
                  :style="{ width: '670px' }"
               />
            </VToolbar>
         </VCardTitle>
      </template>
      <template #[`item.actions`]="{ item }">
         <span class="d-inline-flex align-center">
            <TooltipIconButton
               bottom
               tooltip="Update File Response Codes"
               icon="mdi-pencil"
               :color="$colorTheme.accentColor"
               @click="showDrawer(item)"
            />
         </span>
      </template>
   </VDataTable>
</template>

<script>
import dataTableMixin from '@/mixins/dataTableMixin';
import { ACHFileResponseCodeService } from '@/services';

export default {
   mixins: [dataTableMixin],
   data: () => ({
      headers: [
         { text: 'Code', value: 'response_code' },
         { text: 'Description', value: 'description' },
         { text: 'Hyphen Cost', value: 'hyphen_cost' },
         { text: 'Client Charge', value: 'client_charge' },
         { text: 'Actions', value: 'actions', sortable: false },
      ],
      responseCodes: { data: [], total: 0 },
   }),
   methods: {
      updateTable() {
         this.dataTableMixin.loading = true;
         ACHFileResponseCodeService.index({
            config: this.dataTableMixinFilters(),
         })
            .then(({ data }) => {
               this.responseCodes = data;
            })
            .catch(() => {})
            .finally(() => {
               this.dataTableMixin.loading = false;
            });
      },
      showDrawer(achFileResponseCode) {
         this.$drawer.show({
            title: `Edit Response Code ${achFileResponseCode.response_code}`,
            props: { achFileResponseCode },
            events: {
               cancel: this.$drawer.close,
               update: () => {
                  this.$drawer.close();
                  this.updateTable();
               },
            },
            component: () => import('./ACHFileResponseCodeForm.vue'),
         });
      },
   },
};
</script>
