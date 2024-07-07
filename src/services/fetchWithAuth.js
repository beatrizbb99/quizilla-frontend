import store from '@/store/index.js';
//import { checkTokenValidity } from '@/services/user.handler.js'; 

const fetchWithAuth = async (url, options = {}, baseUrl = 'https://flowing-gasket-421115.ew.r.appspot.com') => {
    const token = store.getters.getToken;
    
    /*if (token && !checkTokenValidity(token)) {
        store.dispatch('logoutUser');
        throw new Error('Token expired');
    }
    */
    
    const headers = options.headers || {};
    headers['Content-Type'] = 'application/json';

    // Füge den Authorization-Header hinzu, wenn ein Token vorhanden ist
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(baseUrl + url, config);
        console.log(config)
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Fehler bei der Anfrage');
        }

        return response.json();
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
        throw error; // Fehler weiterwerfen, um sie in der Aufrufliste zu behandeln
    }
};

export default fetchWithAuth;
