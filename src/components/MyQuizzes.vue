<template>
    <div class="quiz-container">
        <div v-if="!userId" class="media-container">
            <CloudMedium :path="blablabla" class="media round" />
        </div>
        <div v-else class="media-container">
            <CloudMedium path="Quizilla_media/defaultUser.jpg" class="media round" />
        </div>
        <div class="myquiz-container">
            <div class="container">
                <h1>Meine Quizze</h1>
                <button @click="createQuiz()" class="regular-button create">+ Erstellen</button>
            </div>
            <div class="quiz-list">
                <li v-for="quiz in props.quizzes" :key="quiz.id">
                    <MyQuizzesCard :quizData="quiz" :userId="userId" />
                </li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import MyQuizzesCard from '@/components/MyQuizzesCard';
import { useRouter } from 'vue-router';
import CloudMedium from '../components/CloudMedium';

const router = useRouter();
const userId = "FgfSmrqIIdzlL6rSHBeJ";

const props = defineProps({
  quizzes: Object
});

const createQuiz = () => {
    router.push({
        name: 'CreateQuizzes',
        params: { userId: userId }
    });
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--primary-color);
}

.container h1 {
    font-size: 35pt;
}

.quiz-container {
    display: flex;
}

.quiz-list {
    margin-top: 20px;
    width: 100%;
    overflow: auto;
    border: 2px solid var(--secondary-background-color);
    border-radius: 15px;
}

.left-panel {
    flex: 0 0 auto;
}

.right-panel {
    flex: 1 1 auto;
    margin-left: 20px;
    /* Adjust spacing between left and right panels */
}


.create {
    width: 15%;
    margin-left: 80px;
}

.media-container {
    margin-top: 50px;
    width: 20%;
}

.myquiz-container {
    width: 80%;
}

.media {
    border-radius: 50%;
    border: 1px solid var(--tertiary-color);
    overflow: hidden;
    object-fit: cover;
}

.media.round {
    min-height: 200px;
}
</style>
