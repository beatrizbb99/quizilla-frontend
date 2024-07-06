

export async function register(user) {
    try {
        const response = await fetch('http://localhost:9090/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
                email: user.email
            })
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
        const response = await fetch('http://localhost:9090/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        localStorage.setItem("token",data.token)

        console.log('Login successful');
        return data; 
        
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw new Error('Error creating quiz:', error);
    }
}