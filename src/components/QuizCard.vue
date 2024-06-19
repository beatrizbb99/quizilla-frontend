<template>
    <div>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <!--Insert Bild-->
        <button @click="startQuiz(props.quizData.quiz_id)">Starten</button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    quizData: Object
});

const router = useRouter();

const startQuiz = (quiz_id) => {
  router.push({
    name: 'Quiz',
    params: { id: quiz_id }
  });
};
</script>
<style>
    
</style>