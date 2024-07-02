

export async function register(user) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw new Error('Error creating quiz:', error);
    }
}


export async function login(user) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('ok');
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw new Error('Error creating quiz:', error);
    }
}