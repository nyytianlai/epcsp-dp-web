/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-13 19:22:51
 * @FilePath: \template-bigscreen-vue3\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Loading from '@sutpc/vue3-loading';
import defaultDemo from './default-demo';
import type { NProgressOptions } from 'nprogress';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/components/layout/index.vue'

export const routes = [
  {
    path: '/overall',
    name: 'overall',
    meta: { title: '总览' },
    component: Layout,
    children: [
      {
        path: 'allView',
        name: 'overallAllView',
        realPath: '/overall/allView',
        meta: { title: '总览', keepAlive: false },
        component: () =>import('@/views/overall/overview/index.vue')
      },
    ]
  },
  {
    path: '/device',
    name: 'device',
    meta: { title: '设备管理' },
    component: Layout,
    children: [
      {
        path: 'manage',
        name: 'deviceManage',
        realPath: '/device/manage',
        meta: { title: '设备管理', keepAlive: false },
        component: () =>import('@/views/deviceManage/index.vue')
      },
    ]
  },
  {
    path: '/safety',
    name: 'safety',
    meta: { title: '设备监督' },
    component: Layout,
    children: [
      {
        path: 'supervision',
        name: 'safetySupervision',
        realPath: '/safety/supervision',
        meta: { title: '设备监督', keepAlive: true },
        component: () =>import('@/views/overall/overview/index.vue')
      },
    ]
  },
  {
    path: '/public',
    name: 'public',
    meta: { title: '公共服务' },
    component: Layout,
    children: [
      {
        path: 'service',
        name: 'publicService',
        realPath: '/public/service',
        meta: { title: '公共服务', keepAlive: true },
        component: () =>import('@/views/overall/overview/index.vue')
      },
    ]
  },

];
let routesMap = [
  ...routes,
  {
  // vue-router@4的变化，舍弃*通配符
  // 官方文档：https://next.router.vuejs.org/zh/guide/migration/index.html#%E5%88%A0%E9%99%A4%E4%BA%86-%EF%BC%88%E6%98%9F%E6%A0%87%E6%88%96%E9%80%9A%E9%85%8D%E7%AC%A6%EF%BC%89%E8%B7%AF%E7%94%B1
    path: '/:pathMatch(.*)*',
    redirect: '/overall/allView'
  }
]
if (import.meta.env.DEV) {
  routesMap = [...routesMap,...defaultDemo]
}
console.log(routesMap);


const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routesMap,
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
