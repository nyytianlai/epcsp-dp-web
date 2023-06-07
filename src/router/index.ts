/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-05-09 17:59:04
 * @FilePath: \template-bigscreen-vue3\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import Loading from '@sutpc/vue3-loading';
import defaultDemo from './default-demo';
import type { NProgressOptions } from 'nprogress';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/components/layout/index.vue';
import Layout2 from '@/components/layout2/index.vue';

export const routes = [
  {
    path: '/charging',
    name: 'Charging',
    meta: { title: '充电站' },
    component: Layout,
    children: [
      {
        name: 'ChargingStation',
        path: '/charging/station',
        meta: { title: '充电站', keepAlive: false },
        component: () => import('@/views/charging-station/index.vue')
      }
    ]
  },
  {
    path: '/device',
    name: 'device',
    meta: { title: '设备管理' },
    component: Layout,
    children: [
      {
        name: 'deviceManage',
        path: '/device/manage',
        meta: { title: '设备管理', keepAlive: false },
        component: () => import('@/views/device-manage/index.vue')
      }
    ]
  },
  {
    path: '/safety',
    name: 'safety',
    meta: { title: '安全监管' },
    component: Layout,
    children: [
      {
        name: 'safetySupervision',
        path: '/safety/supervision',
        meta: { title: '安全监管', keepAlive: false },
        component: () => import('@/views/safety-supervision/index.vue')
      }
    ]
  },
  {
    path: '/public',
    name: 'public',
    meta: { title: '公众服务' },
    component: Layout,
    children: [
      {
        name: 'publicService',
        path: '/public/service',
        meta: { title: '公众服务', keepAlive: false },
        component: () => import('@/views/public-service/index.vue')
      }
    ]
  }
];
let routesMap = [
  {
    path: '/',
    redirect: { name: 'overviewAll' }
  },
  // {
  //   path: '/',
  //   name: 'Layout',
  //   meta: { title: '总览' },
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/overview',
  //       name: 'Overview',
  //       meta: { title: '总览', keepAlive: false },
  //       component: () => import('@/views/overview/index.vue')
  //     },
  //     {
  //       path: '/energy-station',
  //       name: 'EnergyStation',
  //       meta: { title: '储能站', keepAlive: false },
  //       component: () => import('@/views/energy-station/index.vue')
  //     },
  //     {
  //       path: '/photovoltaic-station',
  //       name: 'PhotovoltaicStation',
  //       meta: { title: '光伏站', keepAlive: false },
  //       component: () => import('@/views/photovoltaic-station/index.vue')
  //     },
  //     {
  //       path: '/chargings-replacement-cabinet',
  //       name: 'ChargingsReplacementCabinet',
  //       meta: { title: '充换电柜', keepAlive: false },
  //       component: () => import('@/views/chargings-replacement-cabinet/index.vue')
  //     }
  //   ]
  // },

  // {
  //   path: '/overview',
  //   name: 'overview',
  //   meta: { title: '总览' },
  //   component: Layout2,
  //   children: [
  //     {
  //       name: 'overviewAll',
  //       path: '/overview/all',
  //       meta: { title: '总览', keepAlive: false },
  //       component: () => import('@/views/iframe/index.vue')
  //     }
  //   ]
  // },
  ...routes,
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/login.vue')
  },
  {
    path: '/station',
    name: 'station',
    meta: { title: '' },
    component: Layout,
    children: [
      {
        name: 'stationDetail',
        path: '/station/detail',
        meta: { title: '', keepAlive: false },
        component: () => import('@/views/station-detail/index.vue')
      }
    ]
  }
];
if (import.meta.env.DEV) {
  routesMap = [...routesMap, ...defaultDemo];
}

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
});

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
