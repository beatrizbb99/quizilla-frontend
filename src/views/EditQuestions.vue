<template>
    <div v-if="show">
    <QuestionForm :questionData="questionData" @saveQuestionData="handleSaveQuestionData" />
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import QuestionForm from '@/components/QuestionForm.vue'; 
import { useRouter } from 'vue-router';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import { useToast } from 'vue-toast-notification';
import { updateQuestion, getQuestion } from '@/services/question.database.handler.js';

const props = defineProps({
    id: String,
});

const router = useRouter();
const toast = useToast();

const questionData = ref(null);
const show = ref(false);

onMounted(async () => {
  if (props.id) {
    questionData.value = await getQuestion(props.id);
    console.log(questionData.value);
  }
  show.value = true;
});

const handleSaveQuestionData = async (questionData) => {
  try {
    await updateQuestion(props.id, questionData);
    toast.success('Frage wurde bearbeitet!');
    router.push({ name: 'ShowQuestions' });
  } catch (error) {
    console.error('Error editing question:', error);
    toast.error('Es gab einen Fehler bei der Bearbeitung :(');
  }

};

</script>