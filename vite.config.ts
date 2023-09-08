/*
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-19 15:17:13
 * @FilePath: \epcsp-dp-web\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { loadEnv } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-sutpc-svg-icons';
import vitePluginSutpcLibStaticImport from 'vite-plugin-sutpc-lib-static-import';
import vitePluginSutpcLessDeep from 'vite-plugin-sutpc-less-deep';
import vitePluginPurgeIcons from 'vite-plugin-purge-icons';
import vitePluginSutpcIconPark from 'vite-plugin-sutpc-icon-park';
import vitePluginSutpcCommon from 'vite-plugin-sutpc-common';
import { createHtmlPlugin } from 'vite-plugin-html';
// import AutoImport from 'unplugin-auto-import/vite'

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
      target: 'esnext' //browsers can handle the latest ES features
    },
    plugins: [
      vue(),
      vitePluginSutpcLibStaticImport(),
      vitePluginSutpcLessDeep(),
      vitePluginPurgeIcons(),
      vitePluginSutpcIconPark(),
      vitePluginSutpcCommon(),
      createSvgIconsPlugin(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      })
      // AutoImport({//注册
      //   imports: ['vue', 'vue-router'],
      //   dts: 'src/auto-import.d.ts'
      // })
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
    }
  };
};
