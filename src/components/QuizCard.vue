<template>
  <div class="container">
    <div class="content">
      <h2>{{ props.quizData.name }}</h2>
      <div v-if="props.quizData.mediaPath">
        <CloudMedium :path="props.quizData.mediaPath" class="img" />
      </div>
      <div v-else>
        <CloudMedium path="Quizilla_media/default.jpg" class="img" />
      </div>
      <h4>Kategorie: {{ props.quizData.category }}</h4>
      <button @click="startQuiz(props.quizData.quiz_id)" class="regular-button">Starten</button>
    </div>
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

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.content {
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
}

.img {
  min-height: 300px;
  width: 500px;
  object-fit: cover;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
