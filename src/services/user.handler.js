
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
        return data; // Gebe die Antwortdaten zurück
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Error logging in:', error);
    }
}

function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT token: Token must have three parts');
    }

    const payloadBase64 = parts[1];
    let decodedPayload;

    try {
        decodedPayload = JSON.parse(atob(payloadBase64));
    } catch (error) {
        throw new Error('Invalid JWT token: Payload decoding failed');
    }

    return decodedPayload;
}

export function checkTokenValidity(token) {
    if (!token) {
        return false; // Wenn kein Token vorhanden ist, ist er ungültig
    }

    try {
        const decodedToken = decodeJWT(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return false; // Wenn das Ablaufdatum des Tokens abgelaufen ist
        }

        return true; // Wenn der Token gültig ist
    } catch (error) {
        console.error('Error decoding JWT token:', error);
        return false; // Bei einem Decodierungsfehler ist der Token ungültig
    }
}
