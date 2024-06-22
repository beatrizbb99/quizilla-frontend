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
        <CloudImage v-if="mediaPath" :path="mediaPath" />
        <input type="file" @change="handleUpload" v-if="!mediaPath">
        <button @click="uploadMedia" v-if="!mediaPath">Hochladen</button>
        <button @click="deleteMedia" v-if="mediaPath">Löschen</button>
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
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, uploadBytes, deleteObject } from "firebase/storage";
import CloudImage from '../components/CloudImage';
import { v4 as uuidv4 } from 'uuid';  // Import the uuid library

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
const selectedMedia = ref(null);
const mediaPath = ref(question?.mediaUrl || null);

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
        options: saveOptions(),
        mediaUrl: mediaPath.value
    };
    emits('saveQuestionData', questionData);
};

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