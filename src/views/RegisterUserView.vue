<template>
    <div class="register-container">
      <h2>Registrieren</h2>
      <form @submit.prevent="registerUser">
        <div :class="['form-group', { 'has-error': usernameError }]">
          <label for="username">Benutzername:</label>
          <input type="text" id="username" v-model="username" required>
          <span v-if="usernameError" class="error-message">Bitte geben Sie einen Benutzernamen ein.</span>
        </div>
        <div :class="['form-group', { 'has-error': emailError }]">
          <label for="email">E-Mail:</label>
          <input type="email" id="email" v-model="email" required>
          <span v-if="emailError" class="error-message">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>
        </div>
        <div :class="['form-group', { 'has-error': passwordError }]">
          <label for="password">Passwort:</label>
          <input type="password" id="password" v-model="password" required>
          <span v-if="passwordError" class="error-message">Bitte geben Sie ein Passwort ein.</span>
        </div>
        <div :class="['form-group', { 'has-error': passwordConfirmError }]">
          <label for="password-confirm">Passwort bestätigen:</label>
          <input type="password" id="password-confirm" v-model="passwordConfirm" required>
          <span v-if="passwordConfirmError" class="error-message">Die Passwörter stimmen nicht überein.</span>
        </div>
        <button type="submit" class="regular-button">Registrieren</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toast-notification';
  import { register } from '@/services/user.handler.js';
  
  const router = useRouter();
  const toast = useToast();
  
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const passwordConfirm = ref('');
  
  const usernameError = ref(false);
  const emailError = ref(false);
  const passwordError = ref(false);
  const passwordConfirmError = ref(false);
  
  async function registerUser() {
    usernameError.value = !username.value;
    emailError.value = !email.value || !isValidEmail(email.value);
    passwordError.value = !password.value;
    passwordConfirmError.value = !passwordConfirm.value || password.value !== passwordConfirm.value;
  
    if (usernameError.value || emailError.value || passwordError.value || passwordConfirmError.value) {
      toast.error('Bitte füllen Sie alle Felder korrekt aus.');
      return;
    }
  
    try {
      await register({name: username.value, email: email.value, password: password.value});
      toast.success('Erfolgreich registriert! Bitte melden Sie sich an.');
      router.push({ name: 'LoginView' }); // Passe den Routen-Namen nach Bedarf an
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error);
      toast.error('Fehler bei der Registrierung. Bitte versuchen Sie es erneut.');
    }
  }
  
  function isValidEmail(email) {
    // Einfache Validierung für E-Mail-Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  </script>
  
  <style scoped>
  .register-container {
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
  
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  </style>
  