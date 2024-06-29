<template>
  <div class="show-quizzes">
    <div class="options">
      <button @click="selectedOption = 'all'">Alle Quizze</button>
      <button @click="selectedOption = 'my'">Meine Quizze</button>
    </div>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Suche nach Quizze..." />
    </div>
    <ul v-if="selectedOption === 'all'">
      <li v-for="quiz in filteredQuizzes" :key="quiz.id">
        <QuizCard :quizData="quiz" />
      </li>
    </ul>
    <ul v-else-if="selectedOption === 'my'">
      <MyQuizzes />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { quizzes, getAllQuizzes } from '@/services/quiz.database.handler.js';
import QuizCard from '@/components/QuizCard';
import MyQuizzes from '@/components/MyQuizzes';

const selectedOption = ref('all');
const searchQuery = ref('');

const fetchQuizzes = async () => {
  await getAllQuizzes();
};

const filteredQuizzes = computed(() => {
  return quizzes.value.filter(quiz => 
    quiz.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchQuizzes();
});
</script>