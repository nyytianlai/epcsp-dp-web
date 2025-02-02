import { createRouter, createWebHashHistory } from 'vue-router';
import Loading from '@sutpc/vue3-loading';
import defaultDemo from './default-demo';
import type { NProgressOptions } from 'nprogress';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Layout from '@/components/layout/index.vue';
import i18n from '@/locales/i18n';
const { t } = i18n.global;
export const routes = [
  {
    path: '/charging',
    name: 'Charging',
    meta: {
      // title: '充电站'
      title: t('sub-menu.routes.cdz')
    },
    component: Layout,
    children: [
      {
        name: 'ChargingStation',
        path: '/charging/station',
        meta: {
          // title: '充电站',
          title: t('sub-menu.routes.cdz'),
          keepAlive: false
        },
        component: () => import('@/views/charging-station/index.vue')
      }
    ]
  },
  {
    path: '/device',
    name: 'device',
    meta: {
      // title: '设备管理'
      title: t('sub-menu.routes.sbgl')
    },
    component: Layout,
    children: [
      {
        name: 'deviceManage',
        path: '/device/manage',
        meta: {
          // title: '设备管理',
          title: t('sub-menu.routes.sbgl'),
          keepAlive: false
        },
        component: () => import('@/views/device-manage/index.vue')
      }
    ]
  },
  {
    path: '/safety',
    name: 'safety',
    meta: {
      // title: '安全监管'
      title: t('sub-menu.routes.aqjg')
    },
    component: Layout,
    children: [
      {
        name: 'safetySupervision',
        path: '/safety/supervision',
        meta: {
          // title: '安全监管',
          title: t('sub-menu.routes.aqjg'),
          keepAlive: false
        },
        component: () => import('@/views/safety-supervision/index.vue')
      }
    ]
  },
  {
    path: '/public',
    name: 'public',
    meta: {
      // title: '公众服务'
      title: t('sub-menu.routes.gzfw')
    },
    component: Layout,
    children: [
      {
        name: 'publicService',
        path: '/public/service',
        meta: {
          // title: '公众服务',
          title: t('sub-menu.routes.gzfw'),
          keepAlive: false
        },
        component: () => import('@/views/public-service/index.vue')
      }
    ]
  }
];

export const specialRoutes = [
  {
    path: '/super-charge',
    name: 'superCharge',
    meta: {
      // title: '超充之城'
      title: t('sub-menu.specialRoutes.cczc')
    },
    component: Layout,
    children: [
      {
        name: 'superChargingBuilding',
        path: '/super-charging/building',
        meta: {
          // title: '超充之城',
          title: t('sub-menu.specialRoutes.cczc'),
          keepAlive: false
        },
        component: () => import('@/views/special-scene/super-charging-building/index.vue')
      }
    ]
  },
  {
    path: '/virtual',
    name: 'virtual',
    meta: {
      // title: '虚拟电厂'
      title: t('sub-menu.specialRoutes.xndc')
    },
    component: Layout,
    children: [
      {
        name: 'virtualElectric',
        path: '/virtual/electric',
        meta: {
          // title: '虚拟电厂',
          title: t('sub-menu.specialRoutes.xndc'),
          keepAlive: false
        },
        component: () => import('@/views/special-scene/virtual-electric/index.vue')
      }
    ]
  },
  {
    path: '/power',
    name: 'power',
    meta: {
      // title: '交能融合'
      title: t('sub-menu.specialRoutes.jnrh')
    },
    component: Layout,
    children: [
      {
        name: 'powerCombine',
        path: '/power/combine',
        meta: {
          // title: '交能融合',
          title: t('sub-menu.specialRoutes.jnrh'),
          keepAlive: false
        },
        component: () => import('@/views/special-scene/power-combine/index.vue')
      }
    ]
  },
  {
    path: '/carnet',
    name: 'carnet',
    meta: {
      // title: '车网互动',
      title: t('sub-menu.specialRoutes.cwhd')
      // disabled: true
    },
    component: Layout,
    children: [
      {
        name: 'carnet-interaction',
        path: '/carnet/interaction',
        meta: {
          // title: '车网互动',
          title: t('sub-menu.specialRoutes.cwhd'),
          keepAlive: false
        },
        component: () => import('@/views/special-scene/carnet-interaction/index.vue')
      }
    ]
  }
];

let routesMap = [
  {
    path: '/',
    redirect: { name: 'Overview' }
  },
  {
    path: '/',
    name: 'Layout',
    meta: { title: '总览' },
    component: Layout,
    children: [
      {
        path: '/overview',
        name: 'Overview',
        meta: { title: '总览', keepAlive: false, dropDownList: true },
        component: () => import('@/views/overview/index.vue')
      },
      {
        path: '/energy-station',
        name: 'EnergyStation',
        meta: { title: '储能站', keepAlive: false },
        component: () => import('@/views/energy-station/index.vue')
      },
      {
        path: '/photovoltaic-station',
        name: 'PhotovoltaicStation',
        meta: { title: '光伏站', keepAlive: false },
        component: () => import('@/views/photovoltaic-station/index.vue')
      },
      {
        path: '/chargings-replacement-cabinet',
        name: 'ChargingsReplacementCabinet',
        meta: { title: '充换电柜', keepAlive: false },
        component: () => import('@/views/chargings-replacement-cabinet/index.vue')
      },
      {
        path: '/power-exchange-station',
        name: 'PowerExchangeStation',
        meta: { title: '换电站', keepAlive: false },
        component: () => import('@/views/power-exchange-station/index.vue')
      }
      // {
      //   path: '/special-scene',
      //   name: 'SpecialScene',
      //   meta: { title: '亮点场景', keepAlive: false },
      //   component: () => import('@/views/special-scene/index.vue')
      // }
    ]
  },

  ...routes,
  ...specialRoutes,
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
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];
if (import.meta.env.DEV) {
  routesMap = [...routesMap, ...defaultDemo];
}

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: routesMap as any,
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
