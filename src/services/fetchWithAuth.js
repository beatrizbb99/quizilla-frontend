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

    //Authorization-Header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(baseUrl + url, config);
        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: 'Unknown error',
            }));
            throw new Error(error.message || 'Fehler bei der Anfrage');
        }

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }

        return response.text();
    } catch (error) {
        console.error('Fehler bei der Anfrage:', error);
        throw error;
    }
};

export default fetchWithAuth;
