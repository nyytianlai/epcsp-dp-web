<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-11 09:55:35
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-14 15:22:54
 * @FilePath: \epcsp-dp-web\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
## 私服设置
[请参考这里设置好私服](http://dev.sutpc.com/components/frontend/vue3/)

## 兼容性注意
Vite 需要 Node.js 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

## 安装依赖
``` bash
pnpm install 
```

## 本地开发
``` bash
pnpm run dev
```

## 构建
``` bash
pnpm run build:pro
```

## 工程说明
本工程基于pc端模板工程做了修改，主要修改的地方如下：
1. 样式字体单位使用rem，在postcss.config.js中配置
2. element-plus的样式文件在 public/static/theme/dark/element-plus/index.css中，它的字体大小已经被编译为rem单位，基准值是16px
3. 主题使用了 element-plus 的暗色主题和echarts的暗色主题，主题文件在 public/static/theme/dark/ 目录下
4. 请求默认不显示loading，在src/global/request.js中设置

### 修改网页标题
在`config/env.base`中修改`VITE_APP_TITLE`即可

### 开发服务器配置
在`config/env.base`中设置`VITE_BASE_URL`为服务器地址，`VITE_API_BASEPATH`为接口前缀

### 发起请求
``` js
import request from '@sutpc/axios';

request.get({
  url: '/xxx'
}).then( res => {
  console.log(res);
});
```
[查看组件请求规范文档](http://dev.sutpc.com/standard/frontend/vue3/axios.html#axios%E8%AF%B7%E6%B1%82%E7%A4%BA%E4%BE%8B)

### loading说明
请求默认都会带loading，作用在全局范围。[查看loading的详细规范文档](http://dev.sutpc.com/standard/frontend/vue3/loading.html)

### icon图标
[查看icon的规范文档](http://dev.sutpc.com/standard/frontend/vue3/icon.html)

### echarts使用规范
使用基础组件：[@sutpc/vue3-ec-resize](http://dev.sutpc.com/components/frontend/vue3/charts/sutpc-vue3-ec-resize.html)
，[查看echarts的使用规范](http://dev.sutpc.com/standard/frontend/vue3/echarts.html)

### mapbox-gl使用规范
使用基础组件：[@sutpc/vue3-basemap-mapboxgl](http://dev.sutpc.com/components/frontend/vue3/map/sutpc-vue3-basemap-mapboxgl.html)，[查看地图mapbox-gl的详细规范](http://dev.sutpc.com/standard/frontend/vue3/map.html)

### cesium，mars3d使用规范
使用基础组件：[@sutpc/vue3-basemap-mars3d](http://dev.sutpc.com/components/frontend/vue3/map/sutpc-vue3-basemap-mars3d.html)

#epcsp-dp-web
