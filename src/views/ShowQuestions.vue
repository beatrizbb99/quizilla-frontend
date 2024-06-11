<template>
    <div>
        <h2>Fragesammlung:</h2>
        <table>
            <thead>
                <tr>
                    <th>Kategorie</th>
                    <th>Frage</th>
                    <th>Punkte</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in questions" :key="question.question_id">
                    <td>{{ question.category }}</td>
                    <td>{{ question.question }}</td>
                    <td>{{ question.points }}</td>
                    <td>
                        <button @click="deleteQuestion(question.question_id)">Delete</button>
                        <button @click="editCreateQuestion(question.question_id)">Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="editCreateQuestion()">Neue Frage</button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { questions, getAllQuestions, deleteQuestion } from '../services/question.database.handler';

const router = useRouter();

const fetchQuestions = async () => {
    await getAllQuestions();
};

const editCreateQuestion = (question_id) => {
    if (question_id) {
        router.push({
            name: 'EditQuestions',
            params: { id: question_id }
        });
    } else {
        router.push({
            name: 'CreateQuestions',
        });
    }
};

onMounted(() => {
    fetchQuestions();
});
</script>