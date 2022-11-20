import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./components/Dashboard.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('./components/FormLayoutDemo.vue')
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('./components/InputDemo.vue')
            },
            {
                path: '/floatlabel',
                name: 'floatlabel',
                component: () => import('./components/FloatLabelDemo.vue')
            },
            {
                path: '/invalidstate',
                name: 'invalidstate',
                component: () => import('./components/InvalidStateDemo.vue')
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('./components/ButtonDemo.vue')
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('./components/TableDemo.vue')
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('./components/ListDemo.vue')
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('./components/TreeDemo.vue')
            },
            {
                path: '/panel',
                name: 'panel',
                component: () => import('./components/PanelsDemo.vue')
            },
            {
                path: '/overlay',
                name: 'overlay',
                component: () => import('./components/OverlayDemo.vue')
            },
            {
                path: '/media',
                name: 'media',
                component: () => import('./components/MediaDemo.vue')
            },
            {
                path: '/menu',
                component: () => import('./components/MenuDemo.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('./components/menu/PersonalDemo.vue')
                    },
                    {
                        path: '/menu/seat',
                        component: () => import('./components/menu/SeatDemo.vue')
                    },
                    {
                        path: '/menu/payment',
                        component: () => import('./components/menu/PaymentDemo.vue')
                    },
                    {
                        path: '/menu/confirmation',
                        component: () => import('./components/menu/ConfirmationDemo.vue')
                    },
                ],
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('./components/MessagesDemo.vue')
            },
            {
                path: '/file',
                name: 'file',
                component: () => import('./components/FileDemo.vue')
            },
            {
                path: '/chart',
                name: 'chart',
                component: () => import('./components/ChartDemo.vue')
            },
            {
                path: '/misc',
                name: 'misc',
                component: () => import('./components/MiscDemo.vue')
            },
            {
                path: '/crud',
                name: 'crud',
                component: () => import('./pages/CrudDemo.vue')
            },
            {
                path: '/alumnos',
                name: 'crudalumnos',
                component: () => import('./pages/alumnos/CrudAlumnos.vue')
            },
            {
                path: '/alumnos/nuevoalumno',
                component: () => import('./pages/alumnos/AddStudent.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('./pages/alumnos/steps/PersonalInformation.vue')
                    },
                    {
                        path: '/steps/informacioninstitucional',
                        component: () => import('./pages/alumnos/steps/InstitutionalInformation.vue')
                    },
                    // {
                    //     path: '/steps/payment',
                    //     component: () => import('./pages/alumnos/steps/PaymentDemo.vue')
                    // },
                    {
                        path: '/steps/confirmacion',
                        component: () => import('./pages/alumnos/steps/Confirmation.vue')
                    },
                ],
            },
            // {
            //     path: '/alumnos/pagocuota',
            //     name: 'pagocuota',
            //     component: () => import('./pages/PagoCuota.vue')
            // },
            // {
            //     path: '/docentes',
            //     name: 'cruddocentes',
            //     component: () => import('./pages/CrudDocentes.vue')
            // },
            {
                path: '/administracion/niveles',
                name: 'crudnivel',
                component: () => import('./pages/administracion/CrudNivel.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('./pages/TimelineDemo.vue')
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('./components/EmptyPage.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('./components/Documentation.vue')
            },
            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('./components/BlocksDemo.vue')
            },
            {
                path: '/icons',
                name: 'icons',
                component: () => import('./components/IconsDemo.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requireLogin)){        
        if ( !store.state.isAuthenticated ){
            next('/login')
        }else{
            next()
        }
    } else {
        next() // does not require auth, call next()
    }
})

export default router;
