<template>
  <header class="app-header">
    <router-link to="/" class="logo" style="text-decoration: none;">
      <h1>Quizilla</h1>
    </router-link>
    <nav class="nav">
      <router-link to="/quizzes">Quizze</router-link>
      <router-link to="/categories">Kategorien</router-link>
      <router-link to="/questions">Fragen</router-link>
      <a href="#" @click="logout">Logout</a>
    </nav>
  </header>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const logout = () => {
  store.dispatch('logoutUser').then(() => {
    router.push('/');
  });
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--primary-color);
  color: white;
}

.logo h1 {
  color: var(--secondary-color);
  font-size: 40pt;
  margin: 0;
  letter-spacing: 0.10rem;
}

.nav {
  display: flex;
}

.nav a {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
}
</style>