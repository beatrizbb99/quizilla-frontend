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
        <div>
        <CloudMedium v-if="mediaPath" :path="mediaPath" />
        <input type="file" @change="handleUpload" v-if="!mediaPath">
        <button @click="uploadMedia" v-if="!mediaPath">Hochladen</button>
        <button @click="deleteMedia" v-if="mediaPath">Löschen</button>
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
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, uploadBytes, deleteObject } from "firebase/storage";
import CloudMedium from '../components/CloudMedium';
import { v4 as uuidv4 } from 'uuid';  // Import the uuid library

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
const selectedMedia = ref(null);
const mediaPath = ref(question.value?.mediaPath || null);

const handleUpload = (event) => {
  const file = event.target.files[0];
  selectedMedia.value = file;
};



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
        options: saveOptions(),
        mediaPath: mediaPath.value
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

const uploadMedia = async () => {
  if (selectedMedia.value) {
    try {
      const uniqueFileName = `Quizilla_media/question/${uuidv4()}_${selectedMedia.value.name}`;
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