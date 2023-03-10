import { createRouter, createWebHashHistory } from 'vue-router';
import Loading from '@sutpc/vue3-loading';
import defaultDemo from './default-demo';
import type { NProgressOptions } from 'nprogress';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routeConfig = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        redirect: '/index'
      },
      {
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          // 设置是否路由区域撑满整个屏幕
          full: false
        }
      },
      ...defaultDemo
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routeConfig,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

NProgress.configure({ showSpinner: false } as NProgressOptions);
setTimeout(() => {
  const bar: any = document.getElementById('nprogress')?.getElementsByClassName('bar')[0];
  if (bar) {
    bar.style.background = `var(--el-text-color-primary)`;
  }
})


export const setupRouter = (app) => {

  router.beforeEach((to, from, next) => {
    
    NProgress.start();

    Loading.clear();
    next();
  });

  router.afterEach((to) => {
    NProgress.done();
  });

  app.use(router);
};

export default router;
