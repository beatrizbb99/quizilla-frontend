export async function createAnswer(answer, question_id) {
    try {
        const response = await fetch(`/api/answers/create/${question_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        throw new Error('Error fetching categories:', error);
    }
}

export async function getAnswer(id) {
    try {
        const response = await fetch(`/api/answers/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw new Error(`Error fetching answer with id ${id}:`, error);
    }
}

export async function checkAnswers(submittedAnswers) {
    try {
        const response = await fetch('/api/answers/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submittedAnswers)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching categories:', error);
    }
}