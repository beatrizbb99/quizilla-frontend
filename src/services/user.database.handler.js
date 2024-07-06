import { ref } from 'vue';
import fetchWithAuth from './fetchWithAuth'; // Importiere die Utility-Funktion

export const userQuizzes = ref([]);

export async function getUserQuizzes(userId) {
    try {
        const data = await fetchWithAuth(`/api/users/${userId}/quizzes`);
        userQuizzes.value = data;
    } catch (error) {
        throw new Error(`Error fetching quizzes: ${error.message}`);
    }
}
