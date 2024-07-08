import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index';

import EditCategories from '../views/EditCategories.vue';
import ShowQuizzes from '../views/ShowQuizzes.vue';
import ShowCategories from '../views/ShowCategories.vue';
import ShowQuestions from '@/views/ShowQuestions.vue';
import CreateQuestions from '@/views/CreateQuestions.vue';
import EditQuestions from '@/views/EditQuestions.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterUserView.vue';
import ProfileView from '@/views/ProfileView.vue';
import ChangePasswordView from '@/views/ChangePasswordView.vue';
import CreateQuizzes from '@/views/CreateQuizzes.vue';
import EditQuizzes from '@/views/EditQuizzes.vue';
import QuizGame from '@/views/QuizGame.vue';
import LoginRegister from '@/views/LoginRegister.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path:'/', name: 'LoginRegister', component: LoginRegister },
        {
            path: '/categories/:id',
            name: 'EditCategories',
            component: EditCategories,
            props: route => ({
                id: route.params.id,
                name: route.query.name,
                description: route.query.description
            })
        },
        { path:'/categories/create', name: 'CreateCategories', component: EditCategories, meta: { requiresAuth: true } },
        { path: '/quizzes', name: 'ShowQuizzes', component: ShowQuizzes, meta: { requiresAuth: true } },
        { path: '/categories', name: 'ShowCategories', component: ShowCategories, meta: { requiresAuth: true } },
        { path: '/questions', name: 'ShowQuestions', component: ShowQuestions, meta: { requiresAuth: true } },
        { path: '/questions/:id', name: 'EditQuestions', component: EditQuestions, props: true, meta: { requiresAuth: true } },
        { path: '/questions/create', name: 'CreateQuestions', component: CreateQuestions, meta: { requiresAuth: true } },
        { path: '/login', name: 'LoginView', component: LoginView },
        { path: '/register', name: 'RegisterUserView', component: RegisterView },
        { path: '/profile', name: 'ProfileView', component: ProfileView, meta: { requiresAuth: true } },
        { path: '/changePassword', name: 'ChangePasswordView', component: ChangePasswordView, meta: { requiresAuth: true } },
        { path: '/quizzes/:id', name: 'EditQuizzes', component: EditQuizzes, props: true, meta: { requiresAuth: true } },
        { path: '/quizzes/create/:userId', name: 'CreateQuizzes', component: CreateQuizzes, props: true, meta: { requiresAuth: true } },
        { path: '/quiz/:id', name: 'Quiz', component: QuizGame, props: true, meta: { requiresAuth: true } },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({ name: 'LoginRegister' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;