<template>
  <QuizForm @saveQuizData="handleSaveQuizData" />
</template>

<script setup>
import QuizForm from '@/components/QuizForm.vue';
import { createQuiz } from '@/services/quiz.database.handler.js';
import { useRouter } from 'vue-router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const toast = useToast();

const handleSaveQuizData = async (quizData) => {
  try {
    await createQuiz(quizData);
    toast.success('Neues Quiz wurde erstellt!');
    router.push({ name: 'ShowQuizzes' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    toast.error('Es gab einen Fehler bei der Erstellung :(');
  }

};

</script>