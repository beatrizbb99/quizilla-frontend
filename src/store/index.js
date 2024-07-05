import { createStore } from 'vuex';
import { login, sendUserToSpring } from '@/services/user.handler.js';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || null,
        userId: null, // Initialize userId to null
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
        async loginUser({ commit }, { email, password }) {
            try {

                const functionSQLResponse = await login({ email, password });
                const { user } = functionSQLResponse;
                console.log("kommt von Function: ",user)
                if (user) {
                const response = await sendUserToSpring({user});
                const { token, userId } = response;
                console.log("kommt von spring: ",token, "id: ", userId)

                commit('setToken', token);
                commit('setUserId', userId);
                commit('clearError');
            } else {
                throw new Error('Invalid credentials'); // Handle invalid credentials case
            }
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
        getError: state => state.error,
        getUserId: state => state.userId
    }
});

export default store;
