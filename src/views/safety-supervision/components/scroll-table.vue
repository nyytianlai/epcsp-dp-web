<!--
 * @Author: xiang cao caoxiang@sutpc.com
 * @Date: 2023-04-17 09:12:44
 * @LastEditors: xiang cao caoxiang@sutpc.com
 * @LastEditTime: 2023-04-17 11:32:12
 * @FilePath: \epcsp-dp-web\src\views\safety-supervision\components\scroll-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
      <ScrollTable
        style="width: 100%; height: 3.44rem"
        :autoScroll="false"
        :interval="5000"
        :data="gridInfo.data"
        :highlight-current-row="false"
        v-model="currentIndex"
        @current-change="currentChange"
        class="custom-table"
      >
        <el-table-column
          v-for="(item, index) in gridInfo.columnKeyList"
          :key="index"
          :prop="item.prop"
          align="left"
          :label="item.label"
          :min-width="item.width"
        ></el-table-column>
      </ScrollTable>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted,reactive } from 'vue';
  import ScrollTable from '@sutpc/vue3-scroll-table';
  let gridInfo = reactive({
    columnKeyList: [
      { prop: 'pro', label: '运营商名称', width: 4 },
      { prop: 'pro1', label: '告警数', width: 2 },
      { prop: 'pro2', label: '已确认', width: 2 },
      { prop: 'pro3', label: '恢复数', width: 2 }
    ],
    data: [
        { pro: 'SG20220430sadfasdfasdfafds', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'asdfasdfasdfsadfasdfas', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
        { pro: 'SG20220430', pro1: '410', pro2: '400',pro3:'200' },
    ]
  });
  let currentIndex = ref(0);
  let currentChange = (row) => {
    // 这里是选中的那一行数据
  };
  </script>

  <style lang="less">
</style>