import { createStore } from 'vuex';
import { login, checkTokenValidity } from '@/services/user.handler.js';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || null,
        userId: null,
        error: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        setUserId(state, userId) {
            state.userId = userId;
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
        }
    },
    actions: {
        async loginUser({ commit }, { username, password }) {
            try {
                const response = await login({ username, password });

                //commit('setToken', token);
                commit('setUserId', response.userId)
                commit('clearError');
            } catch (error) {
                commit('setError', error.message);
                throw new Error(error.message);
            }
        },
        logoutUser({ commit }) {
            commit('clearToken');
        },
        async checkTokenValidity({ state, commit }) {
            if (!checkTokenValidity(state.token)) {
                commit('clearToken');
            }
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        getToken: state => state.token,
        getError: state => state.error,
        getUserId: state => state.userId
    }
});

export default store;
