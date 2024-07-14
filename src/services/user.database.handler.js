import { ref } from 'vue';
import fetchWithAuth from './fetchWithAuth';

export const userQuizzes = ref([]);

export async function getUserQuizzes(userId) {
    try {
        const data = await fetchWithAuth(`/api/users/${userId}/quizzes`);
        userQuizzes.value = data;
    } catch (error) {
        throw new Error(`Error fetching quizzes: ${error.message}`);
    }
}
