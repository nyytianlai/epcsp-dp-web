<template>
  <div class="ec-wrap" :style="ecStyle">
    <EcResizeTiny :option="ecOption" v-if="isEchartsReady" @instanceReady="handleInstanceReady" />
  </div>
</template>

<script lang="ts" setup>
import EcResizeTiny, { useEcharts } from '@sutpc/vue3-echarts-tiny';
import { getUrlParam } from '@sutpc/zebra';
import { computed, ref } from 'vue';

const { isEchartsReady } = useEcharts();

var urlParams = new URLSearchParams(location.search);
const paramsValue = JSON.parse(getUrlParam('value') || '');

const VALUE = [{ value: Number(paramsValue.stationCount), label: { offset: [-18, 0] } }];
const yMax = Number(urlParams.get('yMax'));
const quName = urlParams.get('quName');
const areaCode = urlParams.get('areaCode');
const contentHeight = Number(urlParams.get('contentHeight'));

const ecStyle = computed(() => {
  return {
    height: contentHeight + 'px',
    width: '60px'
  };
});

const ecOption = computed(() => {
  const offsetX = 16;
  const offsetY = 5;
  const offsetX1 = [-16, 0, -35];
  const offsetY1 = [14, 10, 0];
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      // 会canvas的应该都能看得懂，shape是从custom传入的
      const xAxisPoint = shape.xAxisPoint;
      console.log(shape);
      const c0 = [shape.x, shape.y + shape.offsetY1]; //右上角
      const c1 = [shape.x - offsetX, shape.y - offsetY + shape.offsetY1]; //左上角
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY + shape.offsetY1]; //左下角
      const c3 = [xAxisPoint[0], xAxisPoint[1] + shape.offsetY1]; //右下角
      ctx
        .moveTo(c0[0], c0[1])
        .lineTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .closePath();
    }
  });
  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint;
      const c1 = [shape.x, shape.y + shape.offsetY1]; //左上
      const c2 = [xAxisPoint[0], xAxisPoint[1] + shape.offsetY1]; //左下
      const c3 = [
        //右下
        xAxisPoint[0] + offsetX,
        xAxisPoint[1] - offsetY + shape.offsetY1
      ];
      const c4 = [shape.x + offsetX, shape.y - offsetY + shape.offsetY1]; //右上
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    }
  });
  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y + shape.offsetY1]; //下
      const c2 = [shape.x + offsetX, shape.y - offsetY + shape.offsetY1]; //右点
      const c3 = [shape.x, shape.y - offsetX + shape.offsetY1 + 4]; //上
      const c4 = [shape.x - offsetX, shape.y - offsetY + shape.offsetY1]; //右点
      ctx
        .moveTo(c1[0], c1[1])
        .lineTo(c2[0], c2[1])
        .lineTo(c3[0], c3[1])
        .lineTo(c4[0], c4[1])
        .closePath();
    }
  });
  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft);
  echarts.graphic.registerShape('CubeRight', CubeRight);
  echarts.graphic.registerShape('CubeTop', CubeTop);

  const barColor = [
    [
      //非高亮 蓝色
      ['#0091B0', '#00529D'],
      ['#4AD9FC', '#096FA8'],
      ['#B6F2FF', '#B6F2FF']
    ]
  ];
  return {
    grid: {
      left: '0',
      right: '10%',
      top: 50,
      bottom: '0',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1001'],
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: '#2B7BD6'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 14
      },
      show: false
    },
    yAxis: {
      type: 'value',
      max: yMax,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: '#2B7BD6'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#153D7D'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 14
      },
      show: false
    },
    series: [
      {
        type: 'custom',
        renderItem: (params, api) => {
          // console.log("params", params, api);
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0] + offsetX1[params.dataIndex],
                  y: location[1],
                  xAxisPoint: api
                    .coord([api.value(0), 0])
                    .map((item, i) => (i === 0 ? item + offsetX1[params.dataIndex] : item)),
                  offsetY1: offsetY1[params.dataIndex]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: barColor[params.dataIndex][0][0]
                    },
                    {
                      offset: 1,
                      color: barColor[params.dataIndex][0][1]
                    }
                  ])
                }
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0] + offsetX1[params.dataIndex],
                  y: location[1],
                  xAxisPoint: api
                    .coord([api.value(0), 0])
                    .map((item, i) => (i === 0 ? item + offsetX1[params.dataIndex] : item)),
                  offsetY1: offsetY1[params.dataIndex]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: barColor[params.dataIndex][1][0]
                    },
                    {
                      offset: 1,
                      color: barColor[params.dataIndex][1][1]
                    }
                  ])
                }
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0] + offsetX1[params.dataIndex],
                  y: location[1],
                  xAxisPoint: api
                    .coord([api.value(0), 0])
                    .map((item, i) => (i === 0 ? item + offsetX1[params.dataIndex] : item)),
                  offsetY1: offsetY1[params.dataIndex]
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: barColor[params.dataIndex][2][0]
                    },
                    {
                      offset: 1,
                      color: barColor[params.dataIndex][2][1]
                    }
                  ])
                }
              }
            ]
          };
        },
        data: VALUE
      },
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: (e) => {
              // if(areaCode=='440305'){
              //   e.value=1500
              // }else if(areaCode=='440304'){
              //   e.value=1318
              // }
              return e.value;
            },
            fontSize: 14,
            color: '#E6F7FF',
            backgroundColor: {
              image: new URL('./images/back.png', import.meta.url).href
            },
            height: 20,
            padding: [2, 10, 8, 11]
          }
        },
        itemStyle: {
          color: 'transparent'
        },
        data: VALUE
      }
    ]
  };
});

const handleInstanceReady = (ecInstance) => {
  ecInstance.on('click', function (params) {
    console.log('获取点击的数据', params);
    ue.dtspoi.postevent(`click-${areaCode}`);
    //在这里可以拿到数据然后调用需要调用的方法
  });
  ecInstance.on('mouseover', function (params) {
    ue.dtspoi.postevent(`mouseover`);
    ue.dtspoi.postevent(`mouseover-${JSON.stringify({ ...paramsValue, contentHeight, quName })}`);
  });
  ecInstance.on('mouseout', function (params) {
    ue.dtspoi.postevent(`mouseout`);
    ue.dtspoi.postevent(`mouseout-${JSON.stringify({ ...paramsValue, contentHeight, quName })}`);
  });
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
.ec-wrap {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0px;
  pointer-events: auto;
}
#pop-panel {
  width: 180px;
  height: 160px;
  position: fixed;
  z-index: 10;
}
.tooltip-img {
  margin-left: 6px;
}
.title {
  position: relative;
  height: 24px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5);
}
.title-word {
  z-index: 99;
  position: relative;
  bottom: 5px;
  /* left: 3PX; */
}

.title-bg {
  clip-path: polygon(0 0, 79% 0, 100% 100%, 0% 100%);
  position: relative;
  top: -15px;
  left: 0;
  background: rgba(0, 255, 249, 1);
  width: 70%;
  height: 15px;
  z-index: -10;
}
.content {
  clip-path: polygon(90% 0, 100% 13%, 100% 100%, 10% 100%, 0 87%, 0 0);
  background: rgba(0, 48, 71, 0.95);
  box-shadow: inset 0px 0px 16px rgba(75, 223, 255, 1);
  padding: 12px;
}
li {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.8);
}
.liRight {
  display: flex;
}
.num {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 2px;
}
</style>
