<template>
    <div>
        <div v-if="props.quizData.mediaPath">
            <CloudMedium :path="props.quizData.mediaPath" />
        </div>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <button>Starten</button>
        <div>
            <button @click="editQuiz(props.quizData.quiz_id)">Bearbeiten</button>
            <button @click="deleteQuizWithId(props.quizData.quiz_id, props.quizData.mediaPath)">Löschen</button>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; 
import { deleteQuiz } from '@/services/quiz.database.handler.js';
import CloudMedium from '../components/CloudMedium';

const router = useRouter();

const editQuiz = (quiz_id) => {
    router.push({
        name: 'EditQuizzes',
        params: { id: quiz_id }
    });
};

const deleteQuizWithId = async (quiz_id, mediaPath) => {
    await deleteQuiz(quiz_id, mediaPath);

}; 

const props = defineProps({
    quizData: Object
});
</script>
<style scoped></style>