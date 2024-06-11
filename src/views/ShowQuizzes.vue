<template>
  <div class="show-quizzes">
    <div class="options">
      <button @click="selectedOption = 'all'">Alle Quizze</button>
      <button @click="selectedOption = 'my'">Meine Quizze</button>
    </div>
    <ul v-if="selectedOption === 'all'">
      <li v-for="quiz in quizzes" :key="quiz.id">
        <QuizCard :quizData="quiz" />
      </li>
    </ul>
    <ul v-else-if="selectedOption === 'my'">
      <MyQuizzes :myQuizData="quizzes" />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { quizzes, getAllQuizzes } from '@/services/quiz.database.handler.js';
import QuizCard from '@/components/QuizCard';
import MyQuizzes from '@/components/MyQuizzes';

const selectedOption = ref('all');

const fetchQuizzes = async () => {
  await getAllQuizzes();
};


onMounted(() => {
  fetchQuizzes();
});
</script>

<style scoped></style>