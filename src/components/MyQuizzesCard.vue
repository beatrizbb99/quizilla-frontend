<template>
    <div>
        <div v-if="props.quizData.mediaPath">
            <CloudMedium :path="props.quizData.mediaPath" />
        </div>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <button @click="startQuiz()">Starten</button>
        <div>
            <button @click="editQuiz()">Bearbeiten</button>
            <button @click="deleteQuizWithId()">Löschen</button>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; 
import { deleteQuiz } from '@/services/quiz.database.handler.js';
import CloudMedium from '../components/CloudMedium';


const props = defineProps({
    quizData: Object,
    userId: String
});

const router = useRouter();

const editQuiz = () => {
    router.push({
        name: 'EditQuizzes',
        params: { id: props.quizData.quiz_id }
    });
};

const deleteQuizWithId = async () => {
    await deleteQuiz(props.quizData.quiz_id, props.userId, props.quizData.mediaPath);
}; 

const startQuiz = () => {
  router.push({
    name: 'Quiz',
    params: { id: props.quizData.quiz_id }
  });
};
</script>
<style scoped></style>