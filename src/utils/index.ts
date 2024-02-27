import { booleanPointInPolygon, point, polygon } from '@turf/turf';
import { gcj02ToWgs84, joinPaths } from '@sutpc/zebra';
import config from '@sutpc/config';
import proj4 from 'proj4';
proj4.defs('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs +type=crs');
proj4.defs(
  'EPSG:4547',
  '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs +type=crs'
);
const CGCS2000_2_GK114 = proj4('EPSG:4490', 'EPSG:4547');
const GK114_2_CGCS2000 = proj4('EPSG:4547', 'EPSG:4490');

export type Cartesian2D = [number, number];

//4490坐标转4547
export const projectCGCS2000_2_GK114 = (coord: Cartesian2D) => {
  return CGCS2000_2_GK114.forward(coord);
};
//4547坐标转4490
export const GK114_2_projectCGCS2000 = (coord: Cartesian2D) => {
  return GK114_2_CGCS2000.forward(coord);
};

//火星坐标转4547
export const GCJ02_2_4547 = (lon: number, lat: number) => {
  const coord84 = gcj02ToWgs84(lon, lat);
  const coord4547 = projectCGCS2000_2_GK114(coord84);
  return coord4547;
};

//点是否在面内
export const pointIsInPolygon = (pointCoord, polygonCoord) => {
  var pt = point(pointCoord);
  var poly = polygon(polygonCoord);
  // var poly = polygonCoord;

  return booleanPointInPolygon(pt, poly);
};

//获得字符串实际长度，中文2，英文0.5
export const getStrLength = function (str) {
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 0.5;
    else realLength += 2;
  }
  return realLength;
};

//简单的防抖函数
var timeout;
export function debounce(func, wait) {
  
  return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timeout)
      timeout = setTimeout(function () {
          func.apply(context, args)
      }, wait);
  };
};


// 深拷贝
// 深拷贝
export const deepClone = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  const res = obj instanceof Array ? [] : {};
  for (const i in obj) {
    res[i] = deepClone(obj[i]);
  }
  return res;
};
// 数值转换
export function simplifyNum(number) {
  // console.log('nu',number)
  if (!number && number != 0) return number;
  var str_num;
  if (number >= 1e3 && number < 1e4) {
    str_num = number / 1e3;
    return str_num + '千';
  } else if (number >= 1e4 && number < 1e7) {
    str_num = number / 1e4;
    return str_num + '万';
  } else if (number >= 1e7 && number < 1e10) {
    str_num = number / 1e8;
    return str_num + '亿';
  } else if (number >= 1e10 && number < 1e11) {
    str_num = number / 1e10;
    return str_num + '百亿';
  } else if (number >= 1e11 && number < 1e12) {
    str_num = number / 1e11;
    return str_num + '千亿';
  } else if (number >= 1e12) {
    str_num = number / 1e12;
    return str_num + '万亿';
  } else {
    //一千以下
    return number;
  }
}
// 翻页屏幕自适应
export function getRemvalue(value: number | number[]) {
  let result
  const docEl = document.documentElement
  const clientHeight = window.innerHeight || docEl.clientHeight || document.body.clientHeight
  if (!clientHeight) return
  if (typeof value !== 'object') {
    // 单个数值
    // const fontSize = clientHeight / 1080
    // result = value * fontSize
    result = value * config.sizeScale;
  } else if (Array.isArray(value)) {
    // 数组
    result = []
    value.forEach((item) => {
      // const res = item * (clientHeight / 1080)
      const res = item * config.sizeScale;
      result.push(res)
    })
  }
  return result
}
// 地图 echart屏幕自适应
export function getRemChartvalue(value: number | number[]) {
  let result
  const docEl = document.documentElement
  const clientWidth = window.innerWidth || docEl.clientWidth || document.body.clientWidth
  if (!clientWidth) return
  if (typeof value !== 'object') {
    // 单个数值
    const fontSize = clientWidth / 1920
    result = value * fontSize
  } else if (Array.isArray(value)) {
    // 数组
    result = []
    value.forEach((item) => {
      const res = item * (clientWidth / 1920)
      result.push(res)
    })
  }
  return result
}

/**
 * 获取弹窗html的地址，弹窗页面可以有如下2种形式：
 * 1. 使用public目录下的静态页面
 * 2. 【建议】使用popup.html，传入渲染的组件名称，组件写在src/popup-views/目录下，组件名称和组件的文件夹或文件名称一致
 **/
export function getPopupHtml({ usePopupHtml = true, com = '', htmlUrl = '', params = {} as any }) {
  params.fontSize = document.documentElement.style.fontSize;
  params.sizeScale = config.sizeScale;
  params.echartsScale = config.echarts.sizeScale;

  let prodHtmlPrefix = location.origin + import.meta.env.VITE_BASE_PATH;

  if (import.meta.env.DEV) {
    /**
     * 更新vite-plugin-sutpc-common到^1.1.0以上，启动服务时带--host参数
     * 会自动生成配置项：VITE_LOCAL_SERVER
     */
    prodHtmlPrefix = import.meta.env.VITE_LOCAL_SERVER;
  }

  if (usePopupHtml) {
    params.com = com;
    htmlUrl = joinPaths(prodHtmlPrefix, 'popup.html');
  } else {
    htmlUrl = joinPaths(prodHtmlPrefix, htmlUrl);
  }

  let paramStrArr = Object.entries(params).map(([key, value]) => {
    return key + '=' + value;
  });

  return htmlUrl + '?' + paramStrArr.join('&');
}