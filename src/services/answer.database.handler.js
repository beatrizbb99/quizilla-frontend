// user.handler.js
import fetchWithAuth from './fetchWithAuth';

export async function createAnswer(answer, question_id) {
    try {
        const response = await fetchWithAuth(`/api/answers/create/${question_id}`, {
            method: 'POST',
            body: JSON.stringify(answer)
        });
        return response; // Rückgabe der Antwort, falls benötigt
    } catch (error) {
        throw new Error(`Error creating answer: ${error.message}`);
    }
}

export async function getAnswer(id) {
    try {
        const response = await fetchWithAuth(`/api/answers/${id}`);
        return response;
    } catch (error) {
        throw new Error(`Error fetching answer with id ${id}: ${error.message}`);
    }
}

export async function checkAnswers(submittedAnswers) {
    try {
        const response = await fetchWithAuth('/api/answers/submit', {
            method: 'POST',
            body: JSON.stringify(submittedAnswers)
        });
        return response;
    } catch (error) {
        throw new Error(`Error checking answers: ${error.message}`);
    }
}
