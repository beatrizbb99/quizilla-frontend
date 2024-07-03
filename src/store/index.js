// store/index.js
import { createStore } from 'vuex';
import { login } from '@/services/user.handler.js';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || null,
        error: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        async loginUser({ commit }, { email, password }) {
            try {
                const response = await login({ email, password });
                const token = response.token; 

                commit('setToken', token);
                commit('clearError');

                //return token;
            } catch (error) {
                commit('setError', error.message);
                throw new Error(error.message);
            }
        },
        logoutUser({ commit }) {
            commit('clearToken');
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        getToken: state => state.token,
        getError: state => state.error
    }
});

export default store;
