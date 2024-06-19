<template>
    <div v-if="show">
        <h1>{{ quiz.name }}</h1>
        <p>Time Remaining: {{ formatTime(timeRemaining) }}</p>
        <div v-for="question_id in quiz.question_ids" :key="question_id">
            <QuizQuestion :question_id="question_id" :answerStatus="answerStatus[question_id]"
                @answer-selected="handleAnswerSelected" />
        </div>
        <button @click="submitAnswers">Finish</button>
        <p>{{ score }}</p>
        <p>{{ points }}</p>
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue';
import { getQuiz } from '@/services/quiz.database.handler.js';
import QuizQuestion from '@/components/QuizQuestion.vue';
import { useToast } from 'vue-toast-notification';
import { checkAnswers } from '@/services/answer.database.handler';

const toast = useToast();
const quiz = ref(null);
const show = ref(false);
const answers = ref({});
const submitted = ref(false);
const answerStatus = ref({});
const score = ref('');
const points = ref(null);
const timeRemaining = ref(0);
let timer = null;


const props = defineProps({
    id: String
});

function handleAnswerSelected(answer) {
    answers.value[answer.questionId] = answer.value;
}



async function submitAnswers() {
    // Überprüfen, ob die Antworten bereits gesendet wurden
    if (submitted.value) {
        toast.info('Antworten wurden bereits gesendet.');
        return;
    }
    answerStatus.value = await checkAnswers(answers.value);
    console.log(answerStatus.value);
    submitted.value = true;
    score.value = `${answerStatus.value["score"]} von ${quiz.value.question_ids.length} Fragen sind richtig!`;
    points.value = `Du hast ${answerStatus.value["points"]} von ${quiz.value.points} Punkten!`;

    clearInterval(timer);
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function startTimer(minutes) {
    const duration = minutes * 60;
    timeRemaining.value = duration;
    timer = setInterval(() => {
        if (timeRemaining.value > 0) {
            timeRemaining.value -= 1;
        } else {
            clearInterval(timer);
            submitAnswers();
        }
    }, 1000);
}

onMounted(async () => {
    if (props.id) {
        quiz.value = await getQuiz(props.id);
        console.log(quiz.value);
        startTimer(quiz.value.time);
    }
    show.value = true;
});

onUnmounted(() => {
    clearInterval(timer);
});

</script>
<style scoped></style>