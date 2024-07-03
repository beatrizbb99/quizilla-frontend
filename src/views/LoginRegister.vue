<template>
    <div class="container">
        <div class="start">
            <h1 class="title">Quizilla</h1>
            <h2 class="title-info">Lernplatform</h2>
            <p class="info">Eine Quiz-Anwendung die groß und mächtig ist, wenn es darum geht, Wissen zu vermitteln!</p>
            <button class="regular-button" @click=login>Login</button>
            <button class="regular-button" @click=register>Registrieren</button>
        </div>
        <img 
            :src="currentImage" 
            alt="Logo" 
            class="logo"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
        >
    </div>
</template>
<script setup>
import { ref } from 'vue';
import logo from '@/assets/LoginRegisterQuizilla.svg';
import hoverLogo from '@/assets/LoginRegisterQuizillaAwake.svg';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentImage = ref(logo);

const handleMouseOver = () => {
    currentImage.value = hoverLogo;
};

const handleMouseLeave = () => {
    currentImage.value = logo;
};

const login = () => {
    router.push({ name: 'LoginView' });
};

const register = () => {
    router.push({ name: 'RegisterUserView' });
};

</script>
<style scoped>

.container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 60px 10px;
}

.start {
    color: var(--primary-color);
    max-width: 30%;
}

.title {
    margin: 0;
    font-size: var(--font-size-larger);
}

.title-info {
    margin: 0;
    font-size: var(--font-size-large);
}

.info {
    margin-top: 30px;
    font-size: var(--font-size-medium);
}

.logo {
    max-width: 40%;
    transition: opacity 0.3s ease;
}
</style>