<template></template>
<script setup lang="ts">
import { inject, onMounted, onBeforeUnmount } from 'vue';
import { GK114_2_projectCGCS2000, pointIsInPolygon } from '@/utils/index';
import { getHeatMap } from '@/views/charging-station/api.js';
import { gcj02ToWgs84 } from '@sutpc/zebra';
import { circle } from '@turf/turf';

const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
//bbox行政区划的包围盒，需要满足 x1<x2  y1<y2  z1<z2
//bbox = [x1,y1,z1,x2,y2,z2]
let bbox = [474542.44, 2483371.45, 5.7, 564130.59, 2529557.43, 344.58];
let xStart = bbox[0];
let yStart = bbox[1];
let zStart = bbox[2];
let xd = bbox[3] - xStart;
let yd = bbox[4] - yStart;
let spacing = 1000; //网格间距
let heatRange = 0.02; //热力点影像的热力范围倍数
let xn = xd / spacing; //x轴上热力点数量
let yn = yd / spacing; //y轴上热力点数量
let heightStart; //热力值和柱子的最低值
let heightEnd; //热力值和柱子的最高值
let gridPointArr = []; //所有的热力点
let gridPolygonArr = []; //热力柱子3Dpolygon
let heatPointNum = 20; //随机生成热力点的数量
let polygon3D = [];
let colorList = [];
let heatMapPoint = []; //热力点数据

//EPSG:4545坐标系参数
const Projection = `+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs`;

//区域范围，用于判断热力点是否在行政区划范围内
const Zoning = [
  [
    [474542.44, 2483371.45],
    [474542.44, 2529557.43],
    [564130.59, 2529557.43],
    [564130.59, 2483371.45],
    [474542.44, 2483371.45]
  ]
];

/**
 * rgb转hex颜色值
 */
const rgbToHex = (r, g, b) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};

/**
 * hex转rgb颜色值
 */
const hexToRgb = (hex) => {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)));
  }
  return rgb;
};

/**
 * 获取渐变颜色组
 */
const gradient = (startColor, endColor, step) => {
  // 将 hex 转换为rgb
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);

  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;

  const gradientColorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push([
      (rStep * i + sColor[0]) / 255,
      (gStep * i + sColor[1]) / 255,
      (bStep * i + sColor[2]) / 255,
      i / (step - 1) / 5 > 0.02 ? i / (step - 1) / 5 : 0.02
    ]);
  }
  return gradientColorArr;
};

/**
 * 处理3d柱状图数据
 */
const set3DpolygonData = () => {
  //3d柱状数据
  let newgridPolygonArr = [];
  let pointAll = JSON.parse(JSON.stringify(gridPointArr));
  //循环每一个热力点
  for (let i = 0; i < heatMapPoint.length; i++) {
    //热力值
    let heatValue = heatMapPoint[i].realTimePower;
    //热力点
    const heatPoint84 = gcj02ToWgs84(
      Number(heatMapPoint[i].longitude),
      Number(heatMapPoint[i].latitude)
    );
    // const heatPoint4547 = projectCGCS2000_2_GK114(heatPoint84);

    //圆的options
    // let options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };
    let options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } };

    for (let j = 1; j < 11; j++) {
      //以热力点为圆心，循环计算等距半径的十个热力圈
      let radius = (spacing * j * heatRange) / 1000; //半径 /1000是转为米
      let cir = circle(heatPoint84, radius, options); //热力圈坐标
      let spacingCut = 0.1;
      pointAll.forEach((item, index) => {
        //循环所有的点
        //判断是否在热力圈内
        let itemCoord2000 = GK114_2_projectCGCS2000(item.CoordPcs);
        if (pointIsInPolygon(itemCoord2000, cir.geometry.coordinates)) {
          //给热力圈内的点加上热力值也就是高度，已经加过了就计算以高的为准，没加过的就加heatValue - (j - 1) * spacing热力值并且不低于heightStart
          if (item.CoordPcs.length == 2) {
            let z = heatValue - (j - 1) * spacingCut > 0 ? heatValue - (j - 1) * spacingCut : 0;
            item.CoordPcs[2] = z;
          } else {
            item.CoordPcs[2] =
              heatValue - (j - 1) * spacingCut > 0
                ? item.CoordPcs[2] + heatValue - (j - 1) * spacingCut
                : item.CoordPcs[2];
          }
          console.log(item.CoordPcs);
        }
      });
    }
  }
  console.log(pointAll);

  //再次循环每一个热力点，生成以点为中心，边长为2倍 s 的正方形
  pointAll.forEach((item, index) => {
    // let x = item.CoordPcs[0];
    // let y = item.CoordPcs[1];
    // let s = (spacing * 1) / 5;
    // let height = 0;
    // //将热力点的热力值赋给正方形的z值
    // if (item.CoordPcs.length === 3) {
    //   height = item.CoordPcs[2];
    // } else {
    //   height = heightStart;
    // }
    // let coordinates = [
    //   [x - s, y - s, height],
    //   [x - s, y + s, height],
    //   [x + s, y + s, height],
    //   [x + s, y - s, height]
    // ];
    // newgridPolygonArr.push({
    //   id: 'HeatMapPolygon3d' + index,
    //   coordinates: coordinates,
    //   color: colorList[coordinates[0][2] - heightStart], //颜色值
    //   // color: '#0b5af0',
    //   height: height, //3D多边形的高度
    //   intensity: 1.0, //亮度
    //   style: 9, //3DPolygon的样式 请参照API开发文档选取枚举
    //   generateTop: true, //是否生成顶面
    //   generateSide: true, //是否生成侧面
    //   generateBottom: true //是否生成底面
    // });
  });
  polygon3D = newgridPolygonArr;
  console.log(polygon3D, 'polygon3Dpolygon3Dpolygon3D');
};

/**
 * 初始化场景
 */
const OnLoad = async () => {
  const { data: res } = await getHeatMap();
  console.log('热力图数据', res);
  heatMapPoint = res;
  let realTimePower = res.map((item) => {
    return item.realTimePower;
  });

  heightStart = Math.min(...realTimePower);
  heightEnd = Math.max(...realTimePower);
  console.log(heightStart, heightEnd);

  colorList = gradient('#d4ff00', '#ff0000', heightEnd - heightStart);

  //以spacing为间距生成bbox内的所有网格点数据，包括地理坐标和投影坐标
  for (let i = 0; i < xn; i++) {
    let xItem = spacing * i;
    for (let j = 0; j < yn; j++) {
      let yItem = spacing * j;
      //投影坐标
      let pointCoordPcs = [xItem + xStart, yItem + yStart];
      //判断点是否在区域范围内
      if (pointIsInPolygon(pointCoordPcs, Zoning)) {
        //拿到范围内的所有网格热力点
        gridPointArr.push({ CoordPcs: pointCoordPcs });
      }
    }
  }
  set3DpolygonData();
  __g.polygon3d.add(polygon3D, null);
};

defineExpose({});
onMounted(() => {
  OnLoad();
});
onBeforeUnmount(() => {});
</script>
<style lang="less" scoped></style>
