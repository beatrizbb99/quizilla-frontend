<template>
    <div>
        <div v-if="props.quizData.mediaPath">
            <CloudMedium :path="props.quizData.mediaPath" />
        </div>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <button @click="startQuiz(props.quizData.quiz_id)">Starten</button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import CloudMedium from '../components/CloudMedium';

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