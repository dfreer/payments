<template>
   <VDataTable
      flat
      :items="sftpConnections.data"
      :headers="headers"
      :loading="dataTableMixin.loading"
      :options.sync="dataTableMixin.options"
      :footer-props.sync="dataTableMixin.footerProps"
      :server-items-length="sftpConnections.total"
      item-key="id"
      class="elevation-1 table-footer expanded-with-alert"
      @update:options="updateTable"
   >
      <template #top>
         <VCardTitle>
            <VToolbar flat>
               <VBtn
                  dark
                  :color="$colorTheme.accentColor"
                  @click="showDrawer()"
               >
                  New SFTP Connection
               </VBtn>

               <VSpacer />
               <VTextField
                  v-model="dataTableMixin.search"
                  single-line
                  hide-details
                  label="Search"
                  append-icon="mdi-magnify"
                  @input="dataTableMixinSearch"
               />
            </VToolbar>
         </VCardTitle>
      </template>
      <template #[`item.actions`]="{ item }">
         <span class="d-inline-flex align-center">
            <TooltipIconButton
               bottom
               :color="$colorTheme.accentColor"
               tooltip="Edit SFTP Site"
               @click="showDrawer(item)"
               icon="mdi-pencil"
            />
            <DeleteDialogButton
               title="Delete SFTP Connection?"
               @destroy="deleteSftpConnection(item.id)"
            >
               <template #trigger="{ show }">
                  <TooltipIconButton
                     bottom
                     :color="$colorTheme.accentColor"
                     tooltip="Delete SFTP Connection?"
                     icon="mdi-delete"
                     @click="show"
                  />
               </template>
            </DeleteDialogButton>
         </span>
      </template>
      <template #[`item.remote_upload_dir`]="{ item }">
         <td>
            {{ item.remote_upload_dir || '/' }}
         </td>
      </template>
      <template #[`item.remote_download_dir`]="{ item }">
         <td>
            {{ item.remote_download_dir || '/' }}
         </td>
      </template>
   </VDataTable>
</template>

<script>
import dataTableMixin from '@/mixins/dataTableMixin';
import { SftpConnectionsService } from '@/services';

export default {
   mixins: [dataTableMixin],
   data: () => ({
      headers: [
         { text: 'Name', value: 'name' },
         { text: 'Port', value: 'port' },
         { text: 'Upload Directory', value: 'remote_upload_dir' },
         { text: 'Download Directory', value: 'remote_download_dir' },
         { text: 'Return File Name', value: 'return_file_name_pattern' },
         { text: 'Actions', value: 'actions', sortable: false },
      ],
      sftpConnections: {
         data: [],
         total: 0,
      },
   }),
   methods: {
      updateTable() {
         this.dataTableMixin.loading = true;
         SftpConnectionsService.index({ config: this.dataTableMixinFilters() })
            .then(({ data }) => {
               this.sftpConnections = data;
            })
            .catch(() => {})
            .finally(() => {
               this.dataTableMixin.loading = false;
            });
      },
      deleteSftpConnection(sftpConnectionId) {
         SftpConnectionsService.destroy(sftpConnectionId)
            .then(this.updateTable)
            .catch(() => {});
      },
      showDrawer(sftpConnection = null) {
         this.$drawer.show({
            title: `${sftpConnection ? 'Edit' : 'New'} SFTP Connection`,
            props: { sftpConnection },
            events: {
               cancel: this.$drawer.close,
               create: () => {
                  this.$drawer.close();
                  this.updateTable();
               },
               update: () => {
                  this.$drawer.close();
                  this.updateTable();
               },
            },
            component: () => import('./SFTPConnectionsForm.vue'),
         });
      },
   },
};
</script>
