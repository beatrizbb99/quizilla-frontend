<template>
    <div class="form-container">
        <h1>Frage:</h1>
        <div>
            <select v-model="selectedCategory">
                <option disabled value="">Kategorie auswählen</option>
                <option v-for="category in categories" :key="category.category_id" :value="category.name">
                    {{ category.name }}
                </option>
            </select>
        </div>
        <input v-model="newQuestion" placeholder="Frage..." :class="{ 'error': isSubmitted && !newQuestion }" />
        <input v-model="newAnswer" placeholder="Antwort..." :class="{ 'error': isSubmitted && !newAnswer }" />
        <select v-model="newPoints">
            <option disabled value="">Punktzahl auswählen</option>
            <option v-for="point in points" :key="point" :value="point">{{ point }}</option>
        </select>
        <div>
            <input v-model="newOptionOne" placeholder="Falsche Antwort..."
                :class="{ 'error': isSubmitted && !newOptionOne }" />
            <input v-model="newOptionTwo" placeholder="Falsche Antwort..."
                :class="{ 'error': isSubmitted && !newOptionTwo }" />
            <input v-model="newOptionThree" placeholder="Falsche Antwort..."
                :class="{ 'error': isSubmitted && !newOptionThree }" />
        </div>
        <button @click="saveQuestion">Speichern</button>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { categories, getAllCategories } from '../services/category.database.handler';
import { useToast } from 'vue-toast-notification';
import { getAnswer } from '@/services/answer.database.handler';

const props = defineProps({
    questionData: Object
});

const emits = defineEmits(['saveQuestionData']);
const toast = useToast();

const points = [5, 10, 15, 20];
const question = ref(props.questionData || null);
const newQuestion = ref(question.value?.question || '');
const newAnswer = ref('');
const newPoints = ref(question.value?.points || points[0]);
const newOptionOne = ref('');
const newOptionTwo = ref('');
const newOptionThree = ref('');
const selectedCategory = ref(question.value?.category || 'Allgemein');
const isSubmitted = ref(false);

const saveOptions = () => {
    const options = [
        newAnswer.value,
        newOptionOne.value,
        newOptionTwo.value,
        newOptionThree.value
    ];

    //random reihenfolge
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
};

const saveQuestion = () => {

    isSubmitted.value = true;
    if (!newQuestion.value || !newAnswer.value || !newOptionOne.value || !newOptionTwo.value || !newOptionThree.value) {
        toast.error('Bitte die Felder ausfüllen.');
        return;
    }

    const questionData = {
        question_id: question.value?.question_id || null,
        category: selectedCategory.value,
        question: newQuestion.value,
        points: newPoints.value,
        options: saveOptions()
    };

    const answerData = {
        answer: newAnswer.value
    };

    emits('saveQuestionData', questionData, answerData);
};

const loadOptions = () => {
    const options = question.value.options.slice();
    const index = options.indexOf(newAnswer.value);
    options.splice(index, 1);
    newOptionOne.value = options[0];
    newOptionTwo.value = options[1];
    newOptionThree.value = options[2];
}

const loadCategories = async () => {
    try {
        await getAllCategories();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const loadAnswer = async (id) => {
    try {
        newAnswer.value = await getAnswer(id);
    } catch (error) {
        console.error('Error fetching answer:', error);
    }
};

onMounted(async () => {
    await loadCategories();
    if (props.questionData) {
        await loadAnswer(question.value.question_id);
        loadOptions();
    }
});
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input,
select {
    padding: 0.5rem;
    font-size: 1rem;
    width: 50%;
}

button {
    width: 50%;
}
</style>