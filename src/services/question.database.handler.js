import { ref } from 'vue';
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, deleteObject } from "firebase/storage";
import fetchWithAuth from './fetchWithAuth';

export const questions = ref([]);

export async function getAllQuestions() {
    try {
        const data = await fetchWithAuth('/api/questions');
        questions.value = data;
    } catch (error) {
        throw new Error(`Error fetching questions: ${error.message}`);
    }
}

export async function getQuestion(id) {
    try {
        const data = await fetchWithAuth(`/api/questions/${id}`);
        return data;
    } catch (error) {
        throw new Error(`Error fetching question with id ${id}: ${error.message}`);
    }
}

export async function getQuestionsByIds(questionIds) {
    try {
        const data = await fetchWithAuth('/api/questions/getByIds', {
            method: 'POST',
            body: JSON.stringify(questionIds)
        });
        return data;
    } catch (error) {
        console.error('Error fetching questions by IDs:', error);
        throw new Error(`Error fetching questions by IDs: ${error.message}`);
    }
}

export async function createQuestion(question) {
    try {
        const data = await fetchWithAuth('/api/questions/create', {
            method: 'POST',
            body: JSON.stringify(question)
        });
        return data;
    } catch (error) {
        throw new Error(`Error creating question: ${error.message}`);
    }
}

export async function updateQuestion(id, question) {
    try {
        await fetchWithAuth(`/api/questions/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify(question)
        });
        console.log(`Question with id ${id} was successfully updated.`);
    } catch (error) {
        throw new Error(`Error updating question with id ${id}: ${error.message}`);
    }
}

export async function deleteQuestion(id, mediaPath) {
    if (mediaPath) {
        try {
            await deleteObject(storageRef(storage, mediaPath));
            console.log('File deleted successfully within deleteQuestion');
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
    try {
        await fetchWithAuth(`/api/questions/delete/${id}`, {
            method: 'DELETE'
        });
        questions.value = questions.value.filter(question => question.question_id !== id);
    } catch (error) {
        throw new Error(`Error deleting question with id ${id}: ${error.message}`);
    }
}
