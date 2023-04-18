<template>
      <ScrollTable
        style="width: 100%; height: 3.34rem"
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
.custom-table {
  font-size: 14px !important;
  font-weight: 400;

  .el-table__header {
    background: linear-gradient(0deg, #1c3b68 -24.83%, rgba(47, 61, 82, 0.0884779) 100%);
    .el-table__cell {
      .cell {
        line-height: 36px;
        font-weight: 400;
      }
    }
  }
  .el-table__body-wrapper {
    .cell {
      line-height: 44px;
      white-space: nowrap;
      color: #fff;
    }
  }
}
</style>