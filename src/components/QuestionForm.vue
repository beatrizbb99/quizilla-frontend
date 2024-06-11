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
        <input v-model="newQuestion" placeholder="Frage..." />
        <input v-model="newAnswer" placeholder="Antwort..." />
        <select v-model="newPoints">
            <option disabled value="">Punktzahl auswählen</option>
            <option v-for="point in points" :key="point" :value="point">{{ point }}</option>
        </select>
        <div>
            <input v-model="newOptionOne" placeholder="Falsche Antwort..." />
            <input v-model="newOptionTwo" placeholder="Falsche Antwort..." />
            <input v-model="newOptionThree" placeholder="Falsche Antwort..." />
        </div>
        <button @click="saveQuestion">Speichern</button>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { categories, getAllCategories } from '../services/category.database.handler';

const props = defineProps({
    questionData: Object
});

const emits = defineEmits(['saveQuestionData']);

const points =  [5, 10, 15, 20];
const question = props.questionData || null;
const newQuestion = ref(question?.question || '');
const newAnswer = ref('');
const newPoints = ref(question?.points || '');
const newOptionOne = ref(question?.options[0] || '');
const newOptionTwo = ref(question?.options[1] || '');
const newOptionThree = ref(question?.options[2] || '');
const selectedCategory = ref(question?.category || '');

const saveOptions = () => {
    const options = [
        newAnswer.value,
        newOptionOne.value,
        newOptionTwo.value,
        newOptionThree.value
    ];

    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
};

const saveQuestion = () => {
    const questionData = {
        question_id: question?.question_id || null,
        category: selectedCategory.value,
        question: newQuestion.value,
        points: newPoints.value,
        options: saveOptions()
    };
    emits('saveQuestionData', questionData);
};

const loadCategories = async () => {
    try {
        await getAllCategories();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

onMounted(() => {
    loadCategories();
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