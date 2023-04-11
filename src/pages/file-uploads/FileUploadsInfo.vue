<template>
   <div>
      <p>
         <VBtn
            small
            @click="$emit('download', upload)"
         >
            <span class="mr-2">Download</span>
            <VIcon>mdi-download</VIcon>
         </VBtn>
      </p>
      <p class="paragraph-text">
         Path:
         <span class="font-weight-bold paragraph-text">
            {{ upload.path }}
         </span>
      </p>
      <p>
         File Type:
         <span class="font-weight-bold body-2">
            {{ upload.file_type }}
         </span>
      </p>
      <p>
         File Size:
         <span class="font-weight-bold body-2">{{ upload.size }}</span>
      </p>
      <p>
         File Upload Status:
         <span class="font-weight-bold body-2">{{ upload.status }}</span>
      </p>
      <p>
         File Uploaded By:
         <span class="font-weight-bold body-2">
            {{ upload.uploaded_by }}
         </span>
      </p>
      <p>
         Was File Validated:
         <span class="font-weight-bold body-2">
            {{ upload.was_validated ?? 'False' }}
         </span>
      </p>
      <p>
         File Validated At:
         <span class="font-weight-bold body-2">
            {{ upload.validated_at ?? 'Not validated' }}
         </span>
      </p>
      <p md="6">
         File Transferred via SFTP:
         <span class="font-weight-bold body-2">
            {{ upload.sites && upload.sites.length ? 'Yes' : 'No' }}
         </span>
      </p>
      <p>
         <VBtn
            @click="showForm = !showForm"
            dark
            :color="$colorTheme.accentColor"
         >
            Send File to SFTP
         </VBtn>
      </p>
      <p v-if="showForm">
         <FileUploadsInfoForm
            :file_id="upload.id"
            @fileSubmitted="fileSubmitted"
         />
      </p>

      <template v-if="upload.sites && upload.sites.length">
         <h3>SFTP Details:</h3>
         <FileUploadsInfoTable :sites="upload.sites" />
      </template>
   </div>
</template>

<script>
import { FileUploadService } from '@/services';

export default {
   props: {
      id: {
         type: String,
         required: true,
      },
   },
   components: {
      FileUploadsInfoTable: () => import('./FileUploadsInfoTable.vue'),
      FileUploadsInfoForm: () => import('./FileUploadsInfoForm.vue'),
   },
   data() {
      return {
         showForm: false,
         upload: {},
      };
   },
   created() {
      this.getFile();
   },
   methods: {
      async getFile() {
         this.upload = (await FileUploadService.show(this.id)).data;
      },
      async fileSubmitted(state = null) {
         if (state) {
            this.showForm = false;
         }
         await this.getFile();
      },
   },
};
</script>
