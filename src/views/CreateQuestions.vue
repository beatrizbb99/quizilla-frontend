<template>
  <QuestionForm @saveQuestionData="handleSaveQuestionData" />
</template>

<script setup>
import QuestionForm from '@/components/QuestionForm.vue';
import { createQuestion } from '@/services/question.database.handler.js';
import { createAnswer } from '@/services/answer.database.handler';
import { useRouter } from 'vue-router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const toast = useToast();

const handleSaveQuestionData = async (questionData, answerData) => {
  try {
    const question_id = await createQuestion(questionData);
    await createAnswer(answerData, question_id);
    toast.success('Neue Frage wurde erstellt!');
    router.push({ name: 'ShowQuestions' });
  } catch (error) {
    console.error('Error creating question:', error);
    toast.error('Es gab einen Fehler bei der Erstellung :(');
  }

};

</script>