<template>
    <div>
        <!--Insert Bild-->
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <button>Starten</button>
        <div>
            <button @click="editQuiz(props.quizData.quiz_id)">Bearbeiten</button>
            <button @click="deleteQuizWithId(props.quizData.quiz_id)">Löschen</button>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router'; 
import { deleteQuiz } from '@/services/quiz.database.handler.js';

const router = useRouter();

const editQuiz = (quiz_id) => {
    router.push({
        name: 'EditQuizzes',
        params: { id: quiz_id }
    });
};

const deleteQuizWithId = async (quiz_id) => {
    await deleteQuiz(quiz_id);

}; 

const props = defineProps({
    quizData: Object
});
</script>
<style scoped></style>