

export async function register(user) {
    try {
        const response = await fetch('https://europe-west1-flowing-gasket-421115.cloudfunctions.net/function-2', {
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
        const response = await fetch('https://europe-west1-flowing-gasket-421115.cloudfunctions.net/function-1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Login successful');
        return data; 
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw new Error('Error creating quiz:', error);
    }
}