window.$ = window.jQuery = require('jquery');
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Session',
        component: () =>
            import ('@/views/Session.vue'),
            meta: {
              requiresAuth: false
            }

    },
      {
      path: '/admin',
      component: () => import ('@/views/Administracion.vue'),
      children: [{
          path: '/editar',
          name: 'Editar',
          component: () =>   import ('@/views/Editar.vue'),
      },{
        path: '/editar/:seleccion', //'/editar-:seleccion'
        name: 'Editar-seleccion',
        component: () =>   import ('@/views/Editar.vue'),
        props: route=>({seleccion:route.params.seleccion})
      }
      ,{
          path: '/archivos',
          name: 'Archivos',
          component: () => import ('@/views/Archivos.vue')
      }],
    },
    // {
    //     path: '/editar',
    //     name: 'Editar',
    //     component: () =>
    //         import ('@/views/Editar.vue'),
    //         meta: {
    //             requiresAuth: true
    //           }
    // },
    // {
    //     path: '/archivos',
    //     name: 'Archivos',
    //     component: () =>
    //         import ('@/views/Archivos.vue'),
    //         meta: {
    //             requiresAuth: true
    //           }
    // },
    {
        path: '**',
        name: 'Página no encontrada',
        component: () =>
            import ('@/views/404.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior() {
        return { x: 0, y: 0, behavior: 'smooth' };
    },
});

router.beforeEach((to, _from, next) => {
  const topath = (to.path);
  const frompath = (_from.path);
  const authenticatedUser = sessionStorage.getItem('jwt');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && ! authenticatedUser){
    next('/')
  }else if (authenticatedUser && topath==frompath){
    next('/editar')
  }
  else next();
});
export default router;
