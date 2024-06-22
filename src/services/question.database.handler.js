import { ref } from 'vue';
import { storage } from "../services/firebaseStorageConfig";
import { ref as storageRef, deleteObject } from "firebase/storage";

export const questions = ref([]);

export async function getAllQuestions() {
    try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        questions.value = data;
    } catch (error) {
        throw new Error('Error fetching questions:', error);
    }
}

export async function getQuestion(id) {
    try {
        const response = await fetch(`/api/questions/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching question with id ${id}:`, error);
    }
}

export async function getQuestionsByIds(questionIds) {
    try {
        const response = await fetch('/api/questions/getByIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionIds)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions by IDs:', error);
        throw new Error('Error fetching questions by IDs');
    }
}


export async function createQuestion(question) {
    try {
        const response = await fetch('/api/questions/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        throw new Error('Error creating question:', error);
    }
}

export async function updateQuestion(id, question) {
    try {
        const response = await fetch(`/api/questions/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        console.log(`Question with id ${id} was successfully updated.`);
    } catch (error) {
        throw new Error(`Error updating question with id ${id}:`, error);
    }
}


export async function deleteQuestion(id, mediaUrl) {
    if (mediaUrl) {
        try {
          await deleteObject(storageRef(storage, mediaUrl));
          console.log('File deleted successfully within deleteQuestion');
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    try {
        const response = await fetch(`/api/questions/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        questions.value = questions.value.filter(question => question.question_id !== id);
    } catch (error) {
        throw new Error(`Error deleting question with id ${id}:`, error);
    }
}