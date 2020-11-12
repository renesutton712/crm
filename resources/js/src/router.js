/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth/authService'
import store from "./store/store";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [

        {
            // =============================================================================
            // MAIN LAYOUT ROUTES
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Theme Routes
                // =============================================================================
                {
                    path: '/',
                    redirect: '/campaigns'
                },
                {
                    path: '/networks',
                    name: 'networks',
                    component: () => import('./views/pages/networks/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/network/add',
                    name: 'add-network',
                    component: () => import('./views/pages/networks/AddNetworkComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/campaigns',
                    name: 'campaigns',
                    component: () => import('./views/pages/campaigns/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/offers',
                    name: 'offers',
                    component: () => import('./views/pages/offers/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/leads',
                    name: 'leads',
                    component: () => import('./views/pages/leads/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/form',
                    name: 'form',
                    component: () => import('./views/pages/leadsForm/formComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/postback',
                    name: 'postback',
                    component: () => import('./views/pages/postback/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/pixels',
                    name: 'pixels',
                    component: () => import('./views/pages/pixels/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/rotator',
                    name: 'rotator',
                    component: () => import('./views/pages/rotators/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                {
                    path: '/postback',
                    name: 'postback',
                    component: () => import('./views/pages/postback/IndexComponent'),
                    meta: {
                        rule: 'admin',
                        authRequired: true,
                    }
                },
                // {
                //     path: '/dashboard/ecommerce',
                //     name: 'dashboard-ecommerce',
                //     component: () => import('./views/DashboardECommerce.vue'),
                //     meta: {
                //         rule: 'admin'
                //     }
                // },


                // =============================================================================
                // Application Routes
                // =============================================================================
                // {
                //     path: '/apps/todo',
                //     redirect: '/apps/todo/all',
                //     name: 'todo'
                // },

                // =============================================================================
                // UI ELEMENTS
                // =============================================================================
                // {
                //     path: '/ui-elements/data-list/list-view',
                //     name: 'data-list-list-view',
                //     component: () => import('@/views/ui-elements/data-list/list-view/DataListListView.vue'),
                //     meta: {
                //         breadcrumb: [
                //             {title: 'Home', url: '/'},
                //             {title: 'Data List'},
                //             {title: 'List View', active: true}
                //         ],
                //         pageTitle: 'List View',
                //         rule: 'editor'
                //     }
                // },


                // =============================================================================
                // COMPONENT ROUTES
                // =============================================================================
                // {
                //     path: '/components/alert',
                //     name: 'component-alert',
                //     component: () => import('@/views/components/vuesax/alert/Alert.vue'),
                //     meta: {
                //         breadcrumb: [
                //             {title: 'Home', url: '/'},
                //             {title: 'Components'},
                //             {title: 'Alert', active: true}
                //         ],
                //         pageTitle: 'Alert',
                //         rule: 'editor'
                //     }
                // },


                // =============================================================================
                // FORMS
                // =============================================================================
                // =============================================================================
                // FORM ELEMENTS
                // =============================================================================
                // {
                //     path: '/forms/form-elements/select',
                //     name: 'form-element-select',
                //     component: () => import('./views/forms/form-elements/select/Select.vue'),
                //     meta: {
                //         breadcrumb: [
                //             {title: 'Home', url: '/'},
                //             {title: 'Form Elements'},
                //             {title: 'Select', active: true}
                //         ],
                //         pageTitle: 'Select',
                //         rule: 'editor'
                //     }
                // },

                // =============================================================================
                // Pages Routes
                // =============================================================================
                // {
                //     path: '/pages/profile',
                //     name: 'page-profile',
                //     component: () => import('@/views/pages/Profile.vue'),
                //     meta: {
                //         breadcrumb: [
                //             {title: 'Home', url: '/'},
                //             {title: 'Pages'},
                //             {title: 'Profile', active: true}
                //         ],
                //         pageTitle: 'Profile',
                //         rule: 'editor'
                //     }
                // },


                // =============================================================================
                // CHARTS & MAPS
                // =============================================================================
                // {
                //     path: '/charts-and-maps/charts/apex-charts',
                //     name: 'extra-component-charts-apex-charts',
                //     component: () => import('@/views/charts-and-maps/charts/apex-charts/ApexCharts.vue'),
                //     meta: {
                //         breadcrumb: [
                //             {title: 'Home', url: '/'},
                //             {title: 'Charts & Maps'},
                //             {title: 'Apex Charts', active: true}
                //         ],
                //         pageTitle: 'Apex Charts',
                //         rule: 'editor'
                //     }
                // },


                // =============================================================================
                // EXTENSIONS
                // =============================================================================
                // {
                //     path: '/extensions/select',
                //     name: 'extra-component-select',
                //     component: () => import('@/views/components/extra-components/select/Select.vue'),
                //     meta: {
                //         breadcrumb: [
                //             {title: 'Home', url: '/'},
                //             {title: 'Extra Components'},
                //             {title: 'Select', active: true}
                //         ],
                //         pageTitle: 'Select',
                //         rule: 'editor'
                //     }
                // },

            ]
        },
        // =============================================================================
        // FULL PAGE LAYOUTS
        // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
                // =============================================================================
                // PAGES
                // =============================================================================
                {
                    path: '/callback',
                    name: 'auth-callback',
                    component: () => import('@/views/Callback.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/login',
                    name: 'page-login',
                    component: () => import('@/views/pages/login/Login.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/register',
                    name: 'page-register',
                    component: () => import('@/views/pages/register/Register.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/forgot-password',
                    name: 'page-forgot-password',
                    component: () => import('@/views/pages/ForgotPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/reset-password',
                    name: 'page-reset-password',
                    component: () => import('@/views/pages/ResetPassword.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/lock-screen',
                    name: 'page-lock-screen',
                    component: () => import('@/views/pages/LockScreen.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/comingsoon',
                    name: 'page-coming-soon',
                    component: () => import('@/views/pages/ComingSoon.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-404',
                    name: 'page-error-404',
                    component: () => import('@/views/pages/Error404.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/error-500',
                    name: 'page-error-500',
                    component: () => import('@/views/pages/Error500.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/not-authorized',
                    name: 'page-not-authorized',
                    component: () => import('@/views/pages/NotAuthorized.vue'),
                    meta: {
                        rule: 'editor'
                    }
                },
                {
                    path: '/pages/maintenance',
                    name: 'page-maintenance',
                    component: () => import('@/views/pages/Maintenance.vue'),
                    meta: {
                        rule: 'editor'
                    }
                }
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ]
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

router.beforeEach((to, from, next) => {

    // if (
    //     to.path === "/pages/login" ||
    //     to.path === "/pages/forgot-password" ||
    //     to.path === "/pages/error-404" ||
    //     to.path === "/pages/error-500" ||
    //     to.path === "/pages/register" ||
    //     to.path === "/callback" ||
    //     to.path === "/pages/comingsoon" ||
    //     (auth.isAuthenticated() || firebaseCurrentUser)
    // ) {
    //     return next();
    // }

    // If auth required, check login. If login fails redirect to login page
    if (to.path === "/pages/error-404" || store.getters.loggedIn) {
        return next();
    }

    if (to.matched.some(record => record.meta.authRequired)) {

        if (!store.getters.loggedIn) {
            next({
                path: 'pages/login',
            })
        } else {
            next()
        }
    } else {
        next();
    }

    // return next()
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });


})

export default router
