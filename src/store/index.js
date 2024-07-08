import { createStore } from 'vuex';
import { login } from '@/services/user.handler.js';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || null,
        userId: localStorage.getItem('userId') || null,
        error: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        setUserId(state, userId) {
            state.userId = userId;
            localStorage.setItem('userId', userId);
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
        clearToken(state) {
            state.token = null;
            state.userId = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        }
    },
    actions: {
        async loginUser({ commit }, { username, password }) {
            try {
                const response = await login({ username, password });
                console.log("response: ", response);
                commit('setToken', response.token);
                commit('setUserId', response.id);
                commit('clearError');
            } catch (error) {
                commit('setError', error.message);
                throw new Error(error.message);
            }
        },
        logoutUser({ commit }) {
            commit('clearToken');
        },
        /*
        async checkTokenValidity({ state, commit }) {
            if (!checkTokenValidity(state.token)) {
                commit('clearToken');
            }
        }*/
    },
    getters: {
        isLoggedIn: state => !!state.token,
        getToken: state => state.token,
        getError: state => state.error,
        getUserId: state => state.userId
    }
});

export default store;
