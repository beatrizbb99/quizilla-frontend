<template>
    <div class="quiz-card">
        <div v-if="props.quizData.mediaPath">
            <CloudMedium :path="props.quizData.mediaPath" class="media" />
        </div>
        <div v-else>
            <CloudMedium path="Quizilla_media/default.jpg" class="media" />
        </div>
        <div class="info-container">
            <h2>{{ props.quizData.name }}</h2>
            <h4>Kategorie: {{ props.quizData.category }}</h4>
            <button @click="startQuiz()" class="regular-button start-btn buttons">Starten</button>
            <div class="button-group">
                <button @click="editQuiz()" class="regular-button edit-button buttons">Bearbeiten</button>
                <button @click="deleteQuizWithId()" class="regular-button delete-button buttons">Löschen</button>
            </div>
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

<style scoped>
.quiz-card {
    display: flex;
    gap: 30px;
    padding: 20px;
    border-radius: 5px;
}

.info-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.media {
    min-height: 250px;
    width: 350px;
}

.info-container h2,
.info-container h4 {
    margin: 0;
    color: var(--primary-color);
}

.info-container h2 {
    font-size: 22pt;
    margin-bottom: 10px;
}

.start-btn {
    margin-top: 30px;
    margin-left: 0;
}

.button-group {
    margin-top: 10px;
}

.button-group button {
    margin-right: 10px;
    margin-left: 0;
}

.buttons {
    font-size: var(--font-size-medium);
}
</style>
