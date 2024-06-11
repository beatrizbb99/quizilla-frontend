<template>
    <div>
        <h1>Meine Quizze</h1>
        <button @click="createQuiz()">Erstellen</button>
        <div>
            <li v-for="quiz in props.myQuizData" :key="quiz.id">
                <MyQuizzesCard :quizData=quiz />
            </li>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import MyQuizzesCard from '@/components/MyQuizzesCard';
import { useRouter } from 'vue-router';

const router = useRouter();

const createQuiz = () => {
    router.push({
        name: 'CreateQuizzes',
    });
};

const props = defineProps({
    myQuizData: Object
});
</script>
<style></style>