<template>
   <VDataTable
      flat
      dark
      :items="noticeCodes.data"
      :headers="headers"
      :loading="dataTableMixin.loading"
      :options.sync="dataTableMixin.options"
      :footer-props.sync="dataTableMixin.footerProps"
      :server-items-length="noticeCodes.total"
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
               tooltip="Update File Notice Codes"
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
import { AchFileNoticeCodeService } from '@/services';

export default {
   components: {
      TooltipIconButton: () => import('@/components/TooltipIconButton.vue'),
   },
   mixins: [dataTableMixin],
   data: () => ({
      headers: [
         { text: 'Code', value: 'notice_code' },
         { text: 'Description', value: 'description' },
         { text: 'Actions', value: 'actions', sortable: false },
      ],
      noticeCodes: { data: [], total: 0 },
   }),
   methods: {
      updateTable() {
         this.dataTableMixin.loading = true;
         AchFileNoticeCodeService.index({
            config: this.dataTableMixinFilters(),
         })
            .then(({ data }) => {
               this.noticeCodes = data;
            })
            .catch(() => {})
            .finally(() => {
               this.dataTableMixin.loading = false;
            });
      },
      showDrawer(achFileNoticeCode) {
         this.$drawer.show({
            title: `Edit Response Code ${achFileNoticeCode.notice_code}`,
            props: { achFileNoticeCode },
            events: {
               cancel: this.$drawer.close,
               update: () => {
                  this.$drawer.close();
                  this.updateTable();
               },
            },
            component: () => import('./AchFileNoticeCodeForm.vue'),
         });
      },
   },
};
</script>
