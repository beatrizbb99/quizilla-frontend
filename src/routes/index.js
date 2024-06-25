import { createRouter, createWebHistory } from 'vue-router'


import EditCategories from '../views/EditCategories.vue';
import ShowQuizzes from '../views/ShowQuizzes.vue';
import ShowCategories from '../views/ShowCategories.vue';
import ShowQuestions from '@/views/ShowQuestions.vue';
import CreateQuestions from '@/views/CreateQuestions.vue';
import EditQuestions from '@/views/EditQuestions.vue';
import LoginView from '@/views/LoginView.vue';
import ProfileView from '@/views/ProfileView.vue';
import ChangePasswordView from '@/views/ChangePasswordView.vue';
import CreateQuizzes from '@/views/CreateQuizzes.vue';
import EditQuizzes from '@/views/EditQuizzes.vue';
import QuizGame from '@/views/QuizGame.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
        { path:'/categories/create', name: 'CreateCategories', component: EditCategories },
        { path: '/quizzes', name: 'ShowQuizzes', component: ShowQuizzes },
        { path: '/categories', name: 'ShowCategories', component: ShowCategories },
        { path: '/questions', name: 'ShowQuestions', component: ShowQuestions },
        { path: '/questions/:id', name: 'EditQuestions', component: EditQuestions, props: true },
        { path: '/questions/create', name: 'CreateQuestions', component: CreateQuestions },
        { path: '/login', name: 'LoginView', component: LoginView },
        { path: '/profile', name: 'ProfileView', component: ProfileView },
        { path: '/changePassword', name: 'ChangePasswordView', component: ChangePasswordView },
        { path: '/quizzes/:id', name: 'EditQuizzes', component: EditQuizzes, props: true },
        { path: '/quizzes/create', name: 'CreateQuizzes', component: CreateQuizzes },
        { path: '/quiz/:id', name: 'Quiz', component: QuizGame, props: true },
    ]
});

export default router;