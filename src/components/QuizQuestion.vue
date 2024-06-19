<template>
    <div v-if="show">
        <h2>{{ question.question }}</h2>
        <div v-for="(option, index) in question.options" :key="index" class="option-container">
            <div :class="getOptionClass(option)">
                <input 
                    type="radio" 
                    :id="`option-${index}`" 
                    :value="option" 
                    v-model="selectedOption" 
                    @change="submitAnswer"
                >
                <label :for="`option-${index}`">{{ option }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits } from 'vue';
import { getQuestion } from '@/services/question.database.handler';

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
    return 'neutral';
}




onMounted(async () => {
    if (props.question_id) {
        question.value = await getQuestion(props.question_id);
    }
    show.value = true;
});

</script>

<style scoped>

.option-container {
    margin: 10px 0px;
    width: 50%;
}

.correct-answer {
    border: 4px solid green;
}

.wrong-answer {
    border: 4px solid red;
}

.neutral {
    border: 2px solid black;
}
</style>
