<template>
   <VCard>
      <VCardTitle>File Uploads</VCardTitle>
      <VDataTable
         flat
         :headers="headers"
         :loading="dataTableMixin.loading"
         :options.sync="dataTableMixin.options"
         :items="uploads.data"
         :footer-props.sync="dataTableMixin.footerProps"
         :server-items-length="uploads.total"
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
                     Upload File
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
         <template #body="{ items }">
            <table-body-transition-group>
               <tr
                  v-for="(item, i) in items"
                  :key="i"
               >
                  <td>{{ item.path }}</td>
                  <td>{{ item.file_type }}</td>
                  <td>{{ item.size }}</td>
                  <td>
                     {{ item.user ? item.user.full_name : item.uploaded_by }}
                  </td>
                  <td>
                     <TooltipIconButton
                        bottom
                        tooltip="Download File"
                        icon="mdi-download"
                        :color="$colorTheme.accentColor"
                        @click="download(item)"
                     />
                     <TooltipIconButton
                        bottom
                        tooltip="Show File Details"
                        icon="mdi-eye"
                        :color="$colorTheme.accentColor"
                        @click="showDrawer(item)"
                     />
                     <DeleteDialogButton
                        v-if="!item.sites_count"
                        @destroy="destroy(item)"
                        width="400px"
                        title="Delete File Upload"
                        content="Are you sure you want to delete this file from storage?"
                     >
                        <template #trigger="{ show }">
                           <TooltipIconButton
                              bottom
                              tooltip="Delete File Upload"
                              icon="mdi-delete"
                              :color="$colorTheme.accentColor"
                              @click="show"
                           />
                        </template>
                     </DeleteDialogButton>
                  </td>
               </tr>
            </table-body-transition-group>
         </template>
      </VDataTable>
   </VCard>
</template>

<script>
import dataTableMixin from '@/mixins/dataTableMixin';
import { FileUploadService } from '@/services';
import appCoreUsersMixin from '@/mixins/appCoreUsersMixin';
import { forceFileDownload } from '@/inc/utils';

export default {
   mixins: [dataTableMixin, appCoreUsersMixin],
   data() {
      return {
         headers: [
            { text: 'File Path', value: 'path' },
            { text: 'File Type ', value: 'file_type' },
            { text: 'File Size', value: 'size' },
            { text: 'Uploaded By', value: 'uploaded_by' },
            { text: 'Actions', value: 'actions' },
         ],
         uploads: { data: [], total: 0 },
         showItem: false,
      };
   },
   methods: {
      async updateTable() {
         this.dataTableMixin.loading = true;
         this.uploads = (
            await FileUploadService.index({
               config: this.dataTableMixinFilters(),
            })
         ).data;
         this.dataTableMixin.loading = false;
         // todo: this process needs to be moved to backend
         this.appCoreUsersMixinFetch(this.uploads.data, 'uploaded_by')
            .then((res) => {
               this.uploads.data = res;
            })
            .catch(() => {
               this.$snackbar.error('User details fetch failed!');
            });
      },
      async showDrawer(upload = null) {
         const config = {};

         if (upload) {
            config.title = 'File Details';
            config.props = { id: upload.id };
            config.events = { download: (item) => this.download(item) };
            config.component = () => import('./FileUploadsInfo.vue');
         } else {
            config.title = 'Upload File';
            config.events = {
               submit: async () => {
                  this.$drawer.close();
                  await this.updateTable();
               },
               cancel: () => this.$drawer.close(),
            };
            config.component = () => import('./FileUploadsForm.vue');
         }

         this.$drawer.show(config);
      },
      async destroy(item) {
         FileUploadService.destroy(item.id)
            .then(() => {
               this.updateTable();
            })
            .catch(() => {});
      },
      download(item) {
         FileUploadService.download(item)
            .then((response) => {
               forceFileDownload(response, item.path);
            })
            .catch(() => {});
      },
   },
};
</script>
