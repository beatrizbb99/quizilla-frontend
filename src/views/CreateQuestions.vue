<template>
  <QuestionForm @saveQuestionData="handleSaveQuestionData" />
</template>

<script setup>
import QuestionForm from '@/components/QuestionForm.vue';
import { createQuestion } from '@/services/question.database.handler.js';
import { useRouter } from 'vue-router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const toast = useToast();

const handleSaveQuestionData = async (questionData) => {
  try {
    await createQuestion(questionData);
    toast.success('Neue Frage wurde erstellt!');
    router.push({ name: 'ShowQuestions' });
  } catch (error) {
    console.error('Error creating question:', error);
    toast.error('Es gab einen Fehler bei der Erstellung :(');
  }

};

</script>