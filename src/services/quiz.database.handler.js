import { ref } from 'vue';
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { userQuizzes } from './user.database.handler';

export const quizzes = ref([]);

export async function getAllQuizzes() {
    try {
        const response = await fetch('/api/quizzes');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        quizzes.value = data;
    } catch (error) {
        throw new Error('Error fetching quiz:', error);
    }
}

export async function getQuiz(id) {
    try {
        const response = await fetch(`/api/quizzes/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching quiz with id ${id}:`, error);
    }
}

export async function createQuiz(quiz, userId) {
    try {
        const response = await fetch(`/api/quizzes/create/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        throw new Error('Error creating quiz:', error);
    }
}

export async function addQuestionToQuiz(quiz_id, question_id) {
    try {
        const response = await fetch(`/api/quizzes/quiz/${quiz_id}/question/${question_id}`, {
            method: 'PUT'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        throw new Error(`Error adding question ${question_id} to quiz ${quiz_id}: `, error);
    }
}

export async function updateQuiz(id, quiz) {
    try {
        const response = await fetch(`/api/quizzes/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quiz)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log(`Quiz with id ${id} was successfully updated.`);
    } catch (error) {
        throw new Error(`Error updating quiz with id ${id}:`, error);
    }
}


export async function deleteQuiz(id, userId, mediaPath) {
    if (mediaPath) {
        try {
            await deleteObject(storageRef(storage, mediaPath));
            console.log('File deleted successfully within deleteQuiz');
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }

    try {
        const response = await fetch(`/api/quizzes/delete/${id}/user/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        quizzes.value = quizzes.value.filter(quiz => quiz.quiz_id !== id);
        userQuizzes.value = userQuizzes.value.filter(quiz => quiz.quiz_id !== id);
    } catch (error) {
        throw new Error(`Error deleting quiz with id ${id}:`, error);
    }
}

export async function deleteQuestionFromQuiz(quiz_id, question_id) {
    try {
        const response = await fetch(`/api/quizzes/delete/quiz/${quiz_id}/question/${question_id}`, {
            method: 'PUT'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        throw new Error(`Error deleting question ${question_id} from quiz ${quiz_id}: `, error);
    }
}
