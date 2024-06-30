<template>
    <div v-if="show" class="question-container">
        <div class="media-container" v-if="question.mediaPath">
            <CloudMedium :path="question.mediaPath" class="media" />
        </div>
        <div class="content-container">
            <div class="question-header">
                <h2>{{ question.question }}</h2>
                <p class="points">{{ question.points }}P</p>
            </div>
            <div class="options-container">
                <div v-for="(option, index) in question.options" :key="index" class="option-wrapper">
                    <div :class="getOptionClass(option)" class="option">
                        <input 
                            type="radio" 
                            :id="`option-${index}`" 
                            :value="option" 
                            v-model="selectedOption"
                            @change="submitAnswer"
                        >
                        <label 
                            :for="`option-${index}`" 
                            @click.prevent 
                            class="option-label"
                        >
                            {{ option }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue';
import { getQuestion } from '@/services/question.database.handler';
import CloudMedium from '../components/CloudMedium';

const question = ref(null);
const show = ref(false);
const selectedOption = ref(null);

const props = defineProps({
    question_id: String,
    answerStatus: Object
});

const emit = defineEmits(['answer-selected']);

function submitAnswer() {
    emit('answer-selected', { questionId: props.question_id, value: selectedOption.value });
}

function getOptionClass(option) {
    if (props.answerStatus && option === props.answerStatus.selectedAnswer) {
        if (props.answerStatus.isCorrect) {
            return 'correct-answer';
        } else {
            return 'wrong-answer';
        }
    } else if (props.answerStatus && option === props.answerStatus.correctAnswer) {
        return 'correct-answer';
    }
    //return 'neutral';
}

onMounted(async () => {
    if (props.question_id) {
        question.value = await getQuestion(props.question_id);
    }
    show.value = true;
});
</script>

<style scoped>
.question-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.media-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
}

.media {
    min-height: 500px;
    object-fit: cover;
}

.content-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    font-size: var(--font-size-medium);
}

.question-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
}

.points {
    font-weight: bold;
    color: var(--tertiary-color);
}

.options-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
}

.option-wrapper {
    flex: 1 1 calc(50% - 10px);
    display: flex;
    justify-content: center;
}

.option {
    display: flex;
    align-items: center;
    background-color: #f2b03681;
    color: var(--tertiary-color);
    padding: 10px;
    border-radius: 5px;
    width: 100%;
}

.option input[type="radio"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 10px;
}

.correct-answer {
    border: 3px solid green;
}

.wrong-answer {
    border: 3px solid red;
}
</style>
