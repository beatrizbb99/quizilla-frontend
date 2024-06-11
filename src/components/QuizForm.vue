<template>
    <div class="form-container">
        <h1>Quiz:</h1>
        <div>
            <select v-model="selectedCategory">
                <option disabled value="">Kategorie auswählen</option>
                <option v-for="category in categories" :key="category.category_id" :value="category.name">
                    {{ category.name }}
                </option>
            </select>
        </div>
        <input v-model="newTitle" placeholder="Titel..." />
        <div>
            <p>Fragen:</p>
            <div class="options">
                <button @click="selectedOption = 'my'">Quiz Fragen</button>
                <button @click="selectedOption = 'all'">Fragen hinzufügen</button>
            </div>
            <table>
                <tbody v-if="selectedOption === 'my'">
                    <tr v-for="question in newQuestions" :key="question.question_id">
                        <td>{{ question.category }}</td>
                        <td>{{ question.question }}</td>
                        <td>{{ question.points }}</td>
                        <button @click="deleteQuestion(question)">Löschen</button>
                    </tr>
                </tbody>
                <tbody v-else-if="selectedOption === 'all'">
                    <tr v-for="question in filteredAllQuestions" :key="question.question_id">
                        <td>{{ question.category }}</td>
                        <td>{{ question.question }}</td>
                        <td>{{ question.points }}</td>
                        <button @click="addQuestion(question)">Hinzufügen</button>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="saveQuiz">Speichern</button>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { categories, getAllCategories } from '../services/category.database.handler';
import { questions, getQuestionsByIds, getAllQuestions } from '../services/question.database.handler';

const props = defineProps({
    quizData: Object
});

const emits = defineEmits(['saveQuizData']);

const quiz = props.quizData || null;
const newQuestions = ref([]);
const filteredAllQuestions = ref([]);
const newTitle = ref(quiz?.name || '');
const selectedCategory = ref(quiz?.category || '');
const selectedOption = ref('my');


const getQuizQuestions = async () => {
    if (quiz?.question_ids && quiz.question_ids.length > 0) {
        newQuestions.value = await getQuestionsByIds(quiz.question_ids);
    }
}

const loadAllQuestions = async () => {
    await getAllQuestions();
    if (quiz && questions.value.length > 0) {
        filteredAllQuestions.value = questions.value.filter(question => !newQuestions.value.some(q => q.question_id === question.question_id));
    } else {
        filteredAllQuestions.value = questions.value;
    }

}

const deleteQuestion = (question) => {
    newQuestions.value = newQuestions.value.filter(q => q.question_id !== question.question_id);
    filteredAllQuestions.value.push(question);
};

const addQuestion = (question) => {
    filteredAllQuestions.value = filteredAllQuestions.value.filter(q => q.question_id !== question.question_id);
    newQuestions.value.push(question);
};

const saveQuiz = () => {

    const quizData = {
        quiz_id: quiz?.quiz_id || null,
        name: newTitle.value,
        category: selectedCategory.value,
        question_ids: newQuestions.value.map(question => question.question_id)
    };

    emits('saveQuizData', quizData);
};

const loadCategories = async () => {
    try {
        await getAllCategories();
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

onMounted(async () => {
    await loadCategories();
    if (quiz?.question_ids) {
        await getQuizQuestions();
    }
    await loadAllQuestions();
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