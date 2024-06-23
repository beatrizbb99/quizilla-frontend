<template>
    <div>
        <div v-if="props.quizData.mediaPath">
            <CloudMedium :path="props.quizData.mediaPath" />
        </div>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <button>Starten</button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import CloudMedium from '../components/CloudMedium';

const props = defineProps({
    quizData: Object
});

console.log(props.quizData);
</script>
<style>
    
</style>