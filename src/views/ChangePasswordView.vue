<template>
    <div class="change-password-container">
      <h2>Passwort ändern</h2>
      <div>
        <ProfileHeader/>
        <router-view/>
      </div>
      <form @submit.prevent="changePassword">
        <div class="form-group">
          <label for="current-password">Altes Passwort:</label>
          <input type="password" id="current-password" v-model="altesPasswort" required>
        </div>
        <div class="form-group">
          <label for="new-password">Neues Passwort:</label>
          <input type="password" id="new-password" v-model="neuesPasswort" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Neues Passwort wiederholen:</label>
          <input type="password" id="confirm-password" v-model="neuesPasswortWiederholen" required>
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
  