<template>
  <div class="charging-wrap">
    <ul class="content four-column-wrap" v-if="data && data.length">
      <li class="four-column-item"
        v-for="(item, index) in data"
        :key="index"
        :class="[stateFormate(item.status)?.code, warnStateFormate(item.isAlarm)?.code]"
        @click="emit('handleClickState', item.eid, item.status, item)"
      >
        <span class="type">{{ typeFormate(item.chargingType).code }}</span>
        <icon
          :icon="`svg-icon:${warnStateFormate(item.isAlarm)?.code}`"
          v-if="item.isAlarm === 0"
        />
        <icon :icon="`svg-icon:${stateFormate(item.status)?.code}`" v-else />
        <span class="power text-ellipsis-1">{{ item.equipmentName }}</span>
        <span class="state">
          <span class="text">{{ stateFormate(item.status).displayName || stateFormate(item.status).name }}</span>
        </span>
      </li>
    </ul>
    <no-data v-else />
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, inject, watch, onBeforeUnmount } from 'vue';
import Icon from '@sutpc/vue3-svg-icon';
import { getTreeLayerIdByName } from '@/global/config/map';
import { useMapStore } from '@/stores/map';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tHead = `station-detail.components.charging-state`;

interface Data {
  eid?: string;
  isAlarm?: number | string;
  status?: number;
  chargingType: string;
  equipmentName?: string;
}
const mapStore = useMapStore();
const aircityObj = inject('aircityObj');
const __g = aircityObj.value?.acApi;
const props = defineProps({
  data: {
    type: Array as () => Data[],
    default: []
  }
});
const emit = defineEmits(['handleClickState']);
const { data } = toRefs(props);
const warningDataId = ref([]);

const stateFormate = (state) => {
  return {
    0: {
      code: 'offline-work',
      name: '离线',
      displayName: t(`${tHead}.state.offline`)
    },
    1: {
      code: 'no-work',
      name: '空闲',
      displayName: t(`${tHead}.state.nowork`)
    },
    2: {
      code: 'no-work',
      name: '空闲',
      displayName: t(`${tHead}.state.nowork`)
    },
    3: {
      code: 'charging-work',
      name: '充电中',
      displayName: t(`${tHead}.state.charging`)
    },
    4: {
      code: 'no-work',
      name: '空闲',
      displayName: t(`${tHead}.state.nowork`)
    },
    5: {
      code: 'no-work',
      name: '空闲',
      displayName: t(`${tHead}.state.nowork`)
    },
    255: {
      code: 'error-work',
      name: '故障',
      displayName: t(`${tHead}.state.errorwork`)
    }
  }[state];
};

const warnStateFormate = (state) => {
  return {
    0: {
      code: 'charging-warning',
      name: '告警',
      displayName: t(`${tHead}.warnState.chargingWarning`)
    }
  }[state];
};

const typeFormate = (type) => {
  return {
    1: {
      code: t(`${tHead}.typeFormate.kc`) || '快充'
    },
    2: {
      code: t(`${tHead}.typeFormate.mc`) ||'慢充'
    },
    3: {
      code: t(`${tHead}.typeFormate.cc`) || '超充'
    },
    4: {
      code: 'V2G'
    }
  }[type];
};

const customFun = async (data) => {
  /**
   * 注意：自定义对象操作
   * 1、可以从资源库pak添加各种内置模型
   * 2、也可以从按规范从UE打包的自定义模型添加
   */

  //添加前清空所有customObject 防止id重复
  await __g.customObject.clear();
  const arr = [];
  let layerId = getTreeLayerIdByName('118Station', mapStore.treeInfo);
  __g?.tileLayer?.getActorInfo(
    {
      id: layerId,
      objectIds: data
    },
    async (res) => {
      // console.log('getActorInfo', res);
      res?.data?.map((item, index) => {
        let co_location = JSON.parse(JSON.stringify(item.location));
        let co_rotation = JSON.parse(JSON.stringify(item.rotation));
        //投影坐标
        let top = {
          id: 'warning-top-' + data[index], //自定义对象唯一id
          pakFilePath: '@path:ZYK.pak', //资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
          assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/报警模型/BP_GJ_LR', //资源目录，自定义对象在pak文件资源包里的相对路径
          location: [co_location[0], co_location[1], co_location[2] + 9.8], //位置坐标
          coordinateType: 0, // 坐标系类型
          rotation: [0, 0, 0], // 世界坐标系旋转
          localRotation: [0, 0, 0], //模型自身旋转
          // scale: [3, 3, 3], //模型缩放
          scale: [10, 10, 10], //模型缩放
          smoothMotion: 1 //1: 平滑移动，0: 跳跃移动
        };
        arr.push(top);
        let bottom = {
          id: 'warning-bottom-' + data[index], //自定义对象唯一id
          pakFilePath: '@path:ZYK.pak', //资源库pak文件路径,推荐使用cloud内置的文件资源管理器加载pak并使用@path方式传入参数
          assetPath: '/JC_CustomAssets/ObjectLibrary/Exhibition/报警模型/BP_BJ_Cube_LR', //资源目录，自定义对象在pak文件资源包里的相对路径
          location: [co_location[0], co_location[1], co_location[2] + 1], //位置坐标
          coordinateType: 0, // 坐标系类型
          rotation: [0, 0, 0], // 世界坐标系旋转
          localRotation: [0, co_rotation[1] - 92, 0], //模型自身旋转
          scale: [1, 1, 2], //模型缩放
          smoothMotion: 1, //1: 平滑移动，0: 跳跃移动
          userData: data[index]
        };
        arr.push(bottom);
      });
      console.log('arr', arr);
      await __g?.customObject.add(arr);
    }
  );
};
watch([data, aircityObj], (newVal) => {
  if (newVal[1]) {
    warningDataId.value = newVal[0]
      .map((item) => {
        if (item.status === 255) {
          return item.eid;
        }
      })
      .filter((item) => item);
    customFun(warningDataId.value);
    //场站车辆和右侧桩的状态保持一致
    let noUseEquipment = newVal[0]
      .map((item) => {
        if (item.status === 1 || item.status === 0) {
          //空闲1 离线0
          return item.eid;
        }
      })
      .filter((item) => item);
    // noUseEquipment.push('006694'); //隐藏车辆充电那个动画
        let ids = [
      '006694',
      '334225_1',
      '334222_2',
      '334224_1',
      '334245_2',
      '334247_1',
      '334232_1',
      '334257_2',
      '334236_2',
      '334259_2',
      '334262_1',
      '334264_1',
      '334249_1',
      '334250_2'
    ];
    noUseEquipment = noUseEquipment.concat(ids);
    let layerId1 = getTreeLayerIdByName('带ID充电中静态车辆', mapStore.treeInfo);
    let layerId2 = getTreeLayerIdByName('带ID的静态车辆', mapStore.treeInfo);
    let layerId3 = getTreeLayerIdByName('充电车充电线', mapStore.treeInfo);
    __g.tileLayer.hideActors([{ id: layerId1, objectIds: noUseEquipment }]);
    __g.tileLayer.hideActors([{ id: layerId2, objectIds: noUseEquipment }]);
    __g.tileLayer.hideActors([{ id: layerId3, objectIds: noUseEquipment }]);
    __g.marker.hide(noUseEquipment);
    let noUseEquipment1 = noUseEquipment.map((element) => {
      return element + '_1';
    });
    __g.tileLayer.hideActors([{ id: layerId3, objectIds: noUseEquipment1 }]);
  }
});
onBeforeUnmount(() => {
  __g?.customObject.clear();
});
</script>
<style lang="less" scoped>
.charging-wrap {
  overflow: hidden auto;
  // height: 345px;
  height: 100%;
  margin-top: 12px;
  // .content {
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: flex-start;
  //   // gap: 12px;
  // }
  li {
    mix-blend-mode: normal;
    box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 85, 113, 0.2);
    backdrop-filter: blur(1px);
    border-radius: 1px;
    // width: 21%;
    // max-width: calc((100% - 36px) / 4);
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // margin-right: 16px;
    // margin-bottom: 12px;
    // margin-right: 5%;
    text-align: center;
    cursor: pointer;
    // &:nth-child(4n) {
    //   margin-right: 0;
    // }
    .type {
      position: absolute;
      top: 5px;
      left: 0;
      padding: 0 2px;
      min-width: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
    }
    .power {
      width: 100%;
      font-size: 12px;
      line-height: 17px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 4px;
      margin-bottom: 3px;
    }
    .el-icon {
      font-size: 34px;
    }
    .state {
      width: 100%;
      line-height: 32px;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      mix-blend-mode: normal;
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 113, 46, 0.2);
      border-radius: 1px;
    }
  }
  .text-font-style {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .charging-work {
    background: linear-gradient(
      255.75deg,
      rgba(37, 177, 255, 0.03) 23.33%,
      rgba(10, 52, 75, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(79, 193, 255, 0.5) 2.5%,
        rgba(79, 193, 255, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(37, 177, 255, 0.04) 0%,
        rgba(58, 184, 255, 0.4) 100%
      );
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 85, 113, 0.2);
      .text {
        background: linear-gradient(180deg, #4bdeff 3.12%, #ffffff 48.96%, #4bdeff 100%);
        .text-font-style;
      }
    }
  }
  .no-work {
    background: linear-gradient(
      255.75deg,
      rgba(37, 255, 150, 0.03) 23.33%,
      rgba(10, 75, 13, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(79, 255, 139, 0.5) 2.5%,
        rgba(79, 255, 223, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(37, 177, 255, 0.04) 0%,
        rgba(58, 255, 172, 0.4) 100%
      );
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 113, 46, 0.2);
      .text {
        background: linear-gradient(180deg, #4bff5d 3.12%, #ffffff 48.96%, #4bff5d 100%);
        .text-font-style;
      }
    }
  }
  .error-work {
    background: linear-gradient(
      255.75deg,
      rgba(255, 207, 37, 0.03) 23.33%,
      rgba(75, 57, 10, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(255, 227, 79, 0.5) 2.5%,
        rgba(255, 185, 79, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(255, 194, 37, 0.04) 0%,
        rgba(255, 212, 58, 0.4) 100%
      );
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(21, 85, 113, 0.2);
      .text {
        background: linear-gradient(180deg, #ffe24b 3.12%, #ffffff 48.96%, #ffcd4b 100%);
        .text-font-style;
      }
    }
  }
  .offline-work {
    background: linear-gradient(
      255.75deg,
      rgba(255, 255, 255, 0.03) 23.33%,
      rgba(70, 70, 70, 0.3) 100%
    );
    .type {
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0.5) 2.5%,
        rgba(255, 255, 255, 0) 162.5%
      );
    }
    .state {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.4) 100%
      );
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(108, 108, 108, 0.2);
      .text {
        background: linear-gradient(180deg, #b3b3b3 3.12%, #ffffff 48.96%, #a2a2a2 100%);
        .text-font-style;
      }
    }
  }
  .charging-warning {
    background: linear-gradient(
      255.75deg,
      rgba(255, 37, 37, 0.03) 23.33%,
      rgba(75, 10, 10, 0.3) 100%
    );
    .type {
      background: linear-gradient(270deg, rgba(255, 79, 79, 0.5) 2.5%, rgba(255, 79, 79, 0) 162.5%);
    }
    .state {
      background: linear-gradient(180deg, rgba(255, 37, 37, 0.04) 0%, rgba(255, 58, 58, 0.4) 100%);
      box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.04), inset 0px 0px 35px rgba(113, 21, 21, 0.2);
      .text {
        background: linear-gradient(180deg, #ff4b4b 3.12%, #ffffff 48.96%, #ff4b4b 100%);
        .text-font-style;
      }
    }
  }
}
</style>
