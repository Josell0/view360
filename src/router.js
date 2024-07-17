import {createRouter, createWebHistory} from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Viewer from './views/Viewer.vue'
import Editor from './views/Editor.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/viewer', name:'Viewer', component: Viewer},
    {path: '/editor', component: Editor},
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;