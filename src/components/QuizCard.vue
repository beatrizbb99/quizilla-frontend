<template>
    <div>
        <CloudImage :path="props.quizData.mediaUrl"/>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <button>Starten</button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import CloudImage from '../components/CloudImage';

const props = defineProps({
    quizData: Object
});

console.log(props.quizData);
</script>
<style>
    
</style>