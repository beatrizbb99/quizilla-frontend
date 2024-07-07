<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div :class="['form-group']">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div :class="['form-group', { 'has-error': passwordError }]">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="regular-button">Anmelden</button>
    </form>
    <button class="regular-button" @click="googleLogin">Mit Google anmelden</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { useStore } from 'vuex';

const router = useRouter();
const toast = useToast();
const username = ref('');
const password = ref('');
const store = useStore();
const passwordError = ref(false);

async function googleLogin(){
  window.location.href = 'https://flowing-gasket-421115.ew.r.appspot.com/oauth2/authorization/google';
}

async function loginUser() {
  passwordError.value = !password.value;

  if (passwordError.value) {
    toast.error('Bitte alle Felder ausfüllen.');
    return;
  }

  try {
    await store.dispatch('loginUser', { username: username.value, password: password.value });
    toast.success('Erfolgreich angemeldet!');
    router.push({ name: 'ShowQuizzes' });
  } catch (error) {
    toast.error('Die eingegebenen Anmeldeinformationen sind falsch. Versuch es erneut...');
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  max-width: 500px; /* Max width for the container */
  margin: 0 auto; /* Center the container */
  border: 1px solid var(--primary-color); /* Use primary color for border */
  border-radius: 8px; /* Optional: Add border radius */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Optional: Add shadow */
  background-color: var(--secondary-background-color); /* Use secondary background color */
}

h2 {
  margin-bottom: 2rem;
  font-size: var(--font-size-large);
  color: var(--primary-color);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%; /* Ensure form-group takes full width */
}

input {
  padding: 1rem;
  font-size: var(--font-size-medium);
  width: calc(100% - 2rem); /* Adjust width to account for padding */
  border: 1px solid var(--primary-color); /* Use primary color for border */
  border-radius: 6px; /* Optional: Add border radius */
}

button {
  padding: 1rem;
  font-size: var(--font-size-medium);
  cursor: pointer;
  width: 100%; /* Ensure button takes full width */
}

.has-error input {
  border: 1px solid red;
}
</style>
