import { loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-sutpc-svg-icons';
import vitePluginSutpcLibStaticImport from 'vite-plugin-sutpc-lib-static-import';
import vitePluginSutpcLessDeep from 'vite-plugin-sutpc-less-deep';
import vitePluginPurgeIcons from 'vite-plugin-purge-icons';
import vitePluginSutpcIconPark from 'vite-plugin-sutpc-icon-park';
import vitePluginSutpcCommon from 'vite-plugin-sutpc-common';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
// import rollupPluginVisualizer from 'rollup-plugin-visualizer';

import type { UserConfig, ConfigEnv } from 'vite';

const root = process.cwd();
const pathResolve = (dir: string) => resolve(root, '.', dir);

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const argMode = process.argv[3] === '--mode' ? process.argv[4] : process.argv[3];
  const configDir = pathResolve('config');
  const env = loadEnv(isBuild ? mode : argMode, configDir);

  return {
    envDir: pathResolve('config'),
    base: env.VITE_BASE_PATH,
    build: {
      target: 'esnext', //browsers can handle the latest ES features
      rollupOptions: {
        input: {
          index: './index.html',
          popup: './popup.html'
        }
      }
    },
    plugins: [
      vue(),
      vitePluginSutpcLibStaticImport(),
      vitePluginSutpcLessDeep(),
      vitePluginPurgeIcons(),
      vitePluginSutpcIconPark(),
      vitePluginSutpcCommon(),
      createSvgIconsPlugin(),
      ViteEjsPlugin({
        title: env.VITE_APP_TITLE
      })
      // isBuild && rollupPluginVisualizer({
      //   emitFile: true,//是否被触摸
      //   filename: "analyze.html",//生成分析网页文件名
      //   open: true,//在默认用户代理中打开生成的文件
      //   gzipSize: true,//从源代码中收集 gzip 大小并将其显示在图表中
      //   brotliSize: true,//从源代码中收集 brotli 大小并将其显示在图表中
      // }),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.less', '.css'],
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    server: {
      proxy: {
        // 接口代理
        ['/web']: {
          target: env.VITE_BASE_URL,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/web/, '')
        },
        // 飞渡geojson数据转发
        ['/freedata']: {
          target: `http://${env.VITE_FD_URL}/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/freedata/, '')
        },
        // 飞渡视频流数据转发
        ['/freedo']: {
          target: `ws://${env.VITE_FD_URL}/`,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/freedo/, '')
        },
        // 宣传视频
        ['/promotion']: {
          target: 'http://10.10.2.63:9109',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/promotion/, '')
        },
        // 宣传视频
        ['/hr-station-pic']: {
          target: 'http://10.226.0.231:9000/hr-station-pic/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/hr-station-pic/, '')
        },
        // 民乐站摄像头视频
        ['/station-camera']: {
          target: 'http://10.226.0.231:9000/station-camera/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/station-camera/, '')
        }
      }
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'element-plus',
        'pinia',
        'dayjs',
        '@sutpc/vue3-ec-resize',
        'echarts',
        'lodash-es',
        '@sutpc/zebra'
      ]
    }
  };
};
