<template>
    <div class="profile-container">
      <h2>Profile</h2>
      <div>
        <ProfileHeader/>
        <router-view/>
      </div>
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="profile-picture">Profile Picture:</label>
          <input type="file" id="profile-picture" @change="handleFileUpload">
        </div>
        <button type="submit">Speichern</button>
      </form>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>

<script setup>
import ProfileHeader from '@/components/ProfileHeader.vue'; 
</script>
<style scoped>
</style>


