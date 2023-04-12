/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-12 10:50:53
 * @FilePath: \epcsp-dp-web\src\router\default-demo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default [
  {
    path: '/default-demo',
    component: () => import('@/views/default-demo/index.vue')
  },
  {
    path: '/default-demo/demo',
    component: () => import('@/views/default-demo/layout.vue'),
    children: [
      {
        path: '',
        redirect: '/default-demo/demo/echarts'
      },
      {
        path: '/default-demo/demo/echarts',
        component: () => import('@/views/default-demo/echarts/index.vue')
      },
      {
        path: '/default-demo/demo/mapbox-gl',
        component: () => import('@/views/default-demo/mapbox-gl/index.vue'),
        meta: {
          full: true
        }
      },
      {
        path: '/default-demo/demo/request',
        component: () => import('@/views/default-demo/request/index.vue')
      },
      {
        path: '/default-demo/demo/icon',
        component: () => import('@/views/default-demo/icon/index.vue')
      },
      {
        path: '/default-demo/demo/loading',
        component: () => import('@/views/default-demo/loading/index.vue')
      }
    ]
  },
  {
    path: '/default-components',
    component: () => import('@/views/default-demo/components-show/index.vue')
  }
];
