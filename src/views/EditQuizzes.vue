<template>
    <div v-if="show">
    <QuizForm :quizData="quizData" @saveQuizData="handleSaveQuizData" />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import QuizForm from '@/components/QuizForm.vue'; 
import { useRouter } from 'vue-router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useToast } from 'vue-toast-notification';
import { updateQuiz, getQuiz } from '@/services/quiz.database.handler.js';

const props = defineProps({
    id: String,
});

const router = useRouter();
const toast = useToast();

const quizData = ref(null);
const show = ref(false);

onMounted(async () => {
  if (props.id) {
    quizData.value = await getQuiz(props.id);
    console.log(quizData.value);
  }
  show.value = true;
});

const handleSaveQuizData = async (quizData) => {
  try {
    await updateQuiz(props.id, quizData);
    toast.success('Quiz wurde bearbeitet!');
    router.push({ name: 'ShowQuizzes' });
  } catch (error) {
    console.error('Error editing quiz:', error);
    toast.error('Es gab einen Fehler bei der Bearbeitung :(');
  }

};
</script>