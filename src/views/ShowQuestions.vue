<template>
    <div>
        <h1>Fragesammlung:</h1>
        <table>
            <thead>
                <tr>
                    <th>Media</th>
                    <th>Kategorie</th>
                    <th>Frage</th>
                    <th>Punkte</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="question in questions" :key="question.question_id">
                    <td v-if="question.mediaPath">
                        <CloudMedium :path="question.mediaPath" class="media"/>
                    </td>
                    <td v-else>
                        <span>Kein Medium</span>
                    </td>
                    <td>{{ question.category }}</td>
                    <td>{{ question.question }}</td>
                    <td>{{ question.points }}</td>
                    <td>
                        <button @click="editCreateQuestion(question.question_id)" class="regular-button edit-button btn">Edit</button>
                        <button @click="deleteQuestion(question.question_id, question.mediaPath)" class="regular-button delete-button btn">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="editCreateQuestion()" class="regular-button btn new">Neue Frage</button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { questions, getAllQuestions, deleteQuestion } from '../services/question.database.handler';
import CloudMedium from '../components/CloudMedium';

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
<style scoped>
.btn {
  font-size: 14pt;
}

.new {
  margin-top: 50px;
  width: 20%;
}

.media {
    min-height: 100px;
    width: 200px;
}
</style>