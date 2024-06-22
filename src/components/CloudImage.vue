<template>
  <div v-if="imageUrl">
    <img style="height: 20vh" :src="imageUrl" alt="" />
  </div>
  <div v-else>
    <p>Bild wird geladen...</p>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps } from 'vue';
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const props = defineProps({
  path: String
});

const imageUrl = ref("https://placehold.co/140x100");

watchEffect(() => {
  if (props.path) {
    getDownloadURL(storageRef(storage, props.path))
      .then((downloadUrl) => {
        imageUrl.value = downloadUrl; 
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
      });
  }
});
</script>
