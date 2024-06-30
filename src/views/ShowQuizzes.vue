<template>
  <div class="show-quizzes">
    <div class="options">
      <button 
        @click="selectedOption = 'all'"
        :class="{ 'active': selectedOption === 'all' }"
      >
        Alle Quizze
      </button>
      <button 
        @click="selectedOption = 'my'"
        :class="{ 'active': selectedOption === 'my' }"
      >
        Meine Quizze
      </button>
    </div>
    <hr>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Suche nach Quizzen..." />
    </div>
    <ul v-if="selectedOption === 'all'" class="quiz-list">
      <li v-for="quiz in filteredQuizzes" :key="quiz.id">
        <QuizCard :quizData="quiz" />
      </li>
    </ul>
    <ul v-else-if="selectedOption === 'my'" class="myquiz-list">
      <MyQuizzes :quizzes="filteredMyQuizzes"/>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { quizzes, getAllQuizzes } from '@/services/quiz.database.handler.js';
import { userQuizzes, getUserQuizzes } from '@/services/user.database.handler';
import QuizCard from '@/components/QuizCard';
import MyQuizzes from '@/components/MyQuizzes';

const selectedOption = ref('my');
const searchQuery = ref('');

const userId = "FgfSmrqIIdzlL6rSHBeJ";

const fetchQuizzes = async () => {
  await getAllQuizzes();
  await getUserQuizzes(userId);
};

const filteredQuizzes = computed(() => {
  return quizzes.value.filter(quiz => 
    quiz.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredMyQuizzes = computed(() => {
  return userQuizzes.value.filter(quiz => 
    quiz.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  fetchQuizzes();
});
</script>
<style scoped>
.show-quizzes {
  padding: 80px;
}

.options button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 30px;
  font-size: var(--font-size-small);
  color: var(--primary-color);
}

.options button.active {
  color: var(--secondary-color);
}

hr {
  border: none;
  height: 2px;
  background-color: var(--primary-color);
  margin: 5px 0;
}

ul {
  list-style: none;
  padding: 0;
}

.search-bar {
  margin-top: 20px;
}

.search-bar input {
  width: 100%;
  max-width: 500px;
  padding: 10px 15px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: var(--secondary-color);
}

.quiz-list {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.quiz-list li {
  margin: 10px;
  width: 100%;
  max-width: 40%;
  background-color: var(--secondary-background-color);
  border-radius: 10px;
  padding: 20px;
}
</style>