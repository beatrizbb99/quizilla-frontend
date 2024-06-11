<template>
    <div>
        <h2>Name: {{ props.quizData.name }}</h2>
        <h4>Kategorie: {{ props.quizData.category }}</h4>
        <!--Insert Bild-->
        <button>Starten</button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    quizData: Object
});

console.log(props.quizData);
</script>
<style>
    
</style>