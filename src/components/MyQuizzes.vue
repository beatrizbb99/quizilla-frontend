<template>
    <div>
        <h1>Meine Quizze</h1>
        <button @click="createQuiz()">Erstellen</button>
        <div>
            <li v-for="quiz in userQuizzes" :key="quiz.id">
                <MyQuizzesCard :quizData=quiz :userId=userId />
            </li>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { userQuizzes, getUserQuizzes } from '@/services/user.database.handler';
import MyQuizzesCard from '@/components/MyQuizzesCard';
import { useRouter } from 'vue-router';

const router = useRouter();
const userId = "FgfSmrqIIdzlL6rSHBeJ";

const fetchQuizzes = async () => {
  await getUserQuizzes(userId);
};

const createQuiz = () => {
    router.push({
        name: 'CreateQuizzes',
        params: { userId: userId }
    });
};

onMounted(() => {
  fetchQuizzes();
});
</script>
<style></style>