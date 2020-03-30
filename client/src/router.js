import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path:'/login',
        name:'login',
        component: () => import('./views/Login.vue'),
        meta: {
            requiresGuest: true
        }
    },
    {
        path:'/register',
        name:'register',
        component: () => import('./views/Register.vue'),
        meta: {
          requiresGuest: true
      }
    },
    {
        path:'/editpost/:id',
        name:'editpost',
        component: () => import('./views/Editpost.vue'),
        meta:{
          requiresAuth: true
       }
    },
    {
        path:'/posts',
        name:'posts',
        component: () => import('./views/Post.vue'),
        meta:{
          requiresAuth: true
       }
    },
    {
      path:'/myposts/:id',
      name:'myposts',
      component: () => import('./views/Myposts.vue'),
      meta:{
        requiresAuth: true
      }
    },
    {
        path:'/addpost',
        name:'addpost',
        component:()=> import('./views/Addpost.vue'),
        meta:{
            requiresAuth: true
         }
    },
    {
        path:'/about',
        name:'about',
        component:()=> import('./views/About.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./views/Profile.vue'),
        meta: {
          requiresAuth: true
        }
    },
    {
        path: '/technologies',
        name: 'technologies',
        component: () => import('./views/Technologies.vue'),
    },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        // Redirect to the Login Page
        next('/login');
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (store.getters.isLoggedIn) {
        // Redirect to the Login Page
        next('/profile');
      } else {
        next();
      }
    } else {
      next()
    }
  });

export default router;
