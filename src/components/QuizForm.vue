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
            <div>
        <CloudMedium v-if="mediaPath" :path="mediaPath" />
        <input type="file" @change="handleUpload" v-if="!mediaPath">
        <button @click="uploadMedia" v-if="!mediaPath">Hochladen</button>
        <button @click="deleteMedia" v-if="mediaPath">Löschen</button>
        </div>
        </div>
        <input v-model="newTitle" placeholder="Titel..." :class="{ 'error': isSubmitted && !newTitle }" />
        <div>
            <select v-model="selectedTime">
                <option disabled value="">Zeit auswählen</option>
                <option v-for="(time, index) in times" :key="index" :value="time">
                    {{ time }}
                </option>
            </select>
        </div>
        <div>
            <p>Fragen:</p>
            <div class="options">
                <button @click="selectedOption = 'my'" :class="{ 'error': isSubmitted && newQuestions.length === 0 }">Quiz Fragen</button>
                <button @click="selectedOption = 'all'">Fragen hinzufügen</button>
            </div>
            <div class="question-table">
                <table v-if="selectedOption === 'my'">
                    <tbody>
                        <tr v-for="question in newQuestions" :key="question.question_id">
                            <td>{{ question.category }}</td>
                            <td>{{ question.question }}</td>
                            <td>{{ question.points }}</td>
                            <button @click="deleteQuestion(question)">Löschen</button>
                        </tr>
                    </tbody>
                </table>
                <table v-else-if="selectedOption === 'all'">
                    <tbody>
                        <tr v-for="question in filteredAllQuestions" :key="question.question_id">
                            <td>{{ question.category }}</td>
                            <td>{{ question.question }}</td>
                            <td>{{ question.points }}</td>
                            <button @click="addQuestion(question)">Hinzufügen</button>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button @click="saveQuiz">Speichern</button>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { categories, getAllCategories } from '../services/category.database.handler';
import { questions, getQuestionsByIds, getAllQuestions } from '../services/question.database.handler';
import { useToast } from 'vue-toast-notification';
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, uploadBytes, deleteObject } from "firebase/storage";
import CloudMedium from '../components/CloudMedium';
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    quizData: Object
});

const emits = defineEmits(['saveQuizData']);
const toast = useToast();

const quiz = props.quizData || null;
const newQuestions = ref([]);
const filteredAllQuestions = ref([]);
const newTitle = ref(quiz?.name || '');
const times = [2, 5, 10, 15];
const selectedTime = ref(quiz?.time || times[0]);
const selectedCategory = ref(quiz?.category || '');
const selectedOption = ref('my');
const isSubmitted = ref(false);
const selectedMedia = ref(null);
const mediaPath = ref(quiz?.mediaPath || null);

const handleUpload = (event) => {
  const file = event.target.files[0];
  selectedMedia.value = file;
};


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

    isSubmitted.value = true;

    if (!newTitle.value || newQuestions.value.length === 0) {
        toast.error('Bitte die Felder ausfüllen.');
        return;
    }

    const quizData = {
        quiz_id: quiz?.quiz_id || null,
        name: newTitle.value,
        category: selectedCategory.value,
        question_ids: newQuestions.value.map(question => question.question_id),
        time: selectedTime.value
        mediaPath: mediaPath.value
    };

    emits('saveQuizData', quizData);
};

const uploadMedia = async () => {
  if (selectedMedia.value) {
    try {
      const uniqueFileName = `Quizilla_media/quiz/${uuidv4()}_${selectedMedia.value.name}`;
      const storageReference = storageRef(storage, uniqueFileName);
      await uploadBytes(storageReference, selectedMedia.value);
      console.log('File uploaded successfully');
      mediaPath.value = uniqueFileName; // Update mediaPath with download URL
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
};

const deleteMedia = async () => {
  if (mediaPath.value) {
    try {
      await deleteObject(storageRef(storage, mediaPath.value));
      console.log('File deleted successfully');
      mediaPath.value = null;
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
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

.question-table {
    min-height: 200px;
    border-collapse: collapse;
    width: 100%;
}
</style>