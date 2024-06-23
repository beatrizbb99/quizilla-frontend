<template>
    <template v-if="isImage">
      <img style="height: 20vh" :src="mediaPath" alt="" />
    </template>
    <template v-else>
      <video style="height: 20vh" :src="mediaPath" controls></video>
    </template>
</template>

<script setup>
import { ref, watchEffect, defineProps } from 'vue';
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const props = defineProps({
  path: String
});

const mediaPath = ref("https://placehold.co/140x100");
const isImage = ref(true);

watchEffect(() => {
  if (props.path) {
    getDownloadURL(storageRef(storage, props.path))
      .then((downloadUrl) => {
        mediaPath.value = downloadUrl;
        const fileExtension = props.path.split('.').pop().toLowerCase();
        isImage.value = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileExtension); //Das Ergebnis ist true, wenn fileExtension eine dieser Bilddateierweiterungen ist, und false, wenn nicht.
      })
      .catch((error) => {
        console.error("Error fetching media URL:", error);
      });
  }
});
</script>
