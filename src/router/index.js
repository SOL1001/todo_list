//  LETS DEFINE OUR ROUTER RULE HERE

import UsersView from '../view/UsersView.vue'
import UserTodosView from '../view/UserTodosView.vue'
import NotFoundView from '../components/404NotFound.vue'


import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: "home",
            component:UsersView
        },
        {
            path: '/users/:id',
            name: "country",
            component: UserTodosView
        },
        {
            path: '/:catchall(.*)*',
            name: "Not Found",
            component: NotFoundView
        }     
    ]

});

export default router;

