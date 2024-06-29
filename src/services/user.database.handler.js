import { ref } from 'vue';

export const userQuizzes = ref([]);

export async function getUserQuizzes(userId) {
    try {
        const response = await fetch(`/api/users/${userId}/quizzes`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        userQuizzes.value = data;
    } catch (error) {
        throw new Error('Error fetching quizzes:', error);
    }
}