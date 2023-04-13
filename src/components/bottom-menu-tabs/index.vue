<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-13 16:08:53
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-13 16:27:46
 * @FilePath: \epcsp-dp-web\src\components\bottom-menu-tabs\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
        <div class="bottom-menu-tabs">
          <div
            class="tab"
            v-for="(item, index) in data"
            :class="[{ active: item.code === activeTab }]"
            @click="handleSelect(item)"
          >
            <span class="label">
              {{ item.label }}
            </span>
          </div>
        </div>
  </template>
  <script setup lang="ts">
  interface Idata {
    code: string | number;
    label: string;
  }
  interface Props {
    data: Idata[];
    modelValue: string | number;
  }
  const props = withDefaults(defineProps<Props>(), {});
  const emit = defineEmits(['update:modelValue', 'changeTab']);
  const { data, modelValue } = toRefs(props);
  const activeTab = ref(data.value[0]?.code);
  const handleSelect = (item) => {
    activeTab.value = item.code;
    emit('update:modelValue', item.code);
    emit('changeTab', item);
  };
  </script>
  <style lang="less" scoped>
.bottom-menu-tabs {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 1364px;
    height: 111px;
    background: url(./images/bottom-bgc.png) no-repeat;
    background-size: 100% 56px;
    background-position: bottom left;
    .tab{
        width: 105px;
        height: 83px;
        background: url(./images/normal.png) no-repeat;
        background-size: 100% 75px;
        background-position: bottom left;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        margin-right: 108px;
        cursor: pointer;
        &.active{
            background-image: url(./images/active.png);
            .label{
                font-weight: 600;
                background: linear-gradient(180deg, #FFFFFF 62.5%, #0AE3F1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }
        }
        &:last-of-type{
            margin-right: 0;
        }
        .label{
            
            font-size: 20px;
            line-height: 30px;
        }
    }
  }
  </style>
  